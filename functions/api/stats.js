const headers = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
}
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers })

async function hashText(value, salt) {
  const bytes = new TextEncoder().encode(`${salt}|${value}`)
  const hash = await crypto.subtle.digest("SHA-256", bytes)
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0")).join("")
}
async function ensureMetric(db, project) {
  const now = Math.floor(Date.now() / 1000)
  await db.prepare(`
    INSERT INTO project_metrics (
      project_id, users, accesses, requests, interested, updated_at
    )
    VALUES (?, 0, 0, 0, 0, ?)
    ON CONFLICT(project_id) DO NOTHING
  `).bind(project, now).run()
}
async function getMetric(db, project) {
  await ensureMetric(db, project)
  const row = await db.prepare(`
    SELECT users, accesses, requests, interested
    FROM project_metrics WHERE project_id = ?
  `).bind(project).first()
  return {
    users: Number(row?.users || 0),
    accesses: Number(row?.accesses || 0),
    requests: Number(row?.requests || 0),
    interested: Number(row?.interested || 0),
  }
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url)
  const projects = (url.searchParams.get("projects") || "")
    .split(",").map((value) => value.trim()).filter(Boolean).slice(0, 100)

  if (!env.PORTFOLIO_DB) {
    return json({ configured: false, reason: "missing_database_binding", metrics: {} })
  }

  try {
    const pairs = await Promise.all(
      projects.map(async (project) => [project, await getMetric(env.PORTFOLIO_DB, project)])
    )
    return json({ configured: true, metrics: Object.fromEntries(pairs) })
  } catch {
    return json({
      configured: false,
      reason: "missing_project_metrics_table",
      error: "Jalankan migrations/0002_project_metrics.sql pada D1.",
      metrics: {},
    }, 503)
  }
}

export async function onRequestPost({ request, env }) {
  if (!env.PORTFOLIO_DB) {
    return json({ configured: false, error: "PORTFOLIO_DB belum dikonfigurasi." }, 503)
  }

  let body
  try { body = await request.json() }
  catch { return json({ error: "JSON tidak valid." }, 400) }

  const project = String(body.project || "").trim()
  if (!project) return json({ error: "project wajib diisi." }, 400)

  try {
    await ensureMetric(env.PORTFOLIO_DB, project)
    const now = Math.floor(Date.now() / 1000)

    if (body.action === "access") {
      await env.PORTFOLIO_DB.prepare(`
        UPDATE project_metrics
        SET accesses = accesses + 1, updated_at = ?
        WHERE project_id = ?
      `).bind(now, project).run()

      return json({
        configured: true,
        metric: await getMetric(env.PORTFOLIO_DB, project),
      })
    }

    if (body.action === "interest") {
      if (!env.TRAFFIC_HASH_SALT) {
        return json({
          configured: false,
          error: "TRAFFIC_HASH_SALT belum dikonfigurasi.",
        }, 503)
      }

      const visitorSource =
        String(body.visitorId || "").trim() ||
        request.headers.get("CF-Connecting-IP") ||
        "unknown"

      const visitorHash = await hashText(
        `${project}|${visitorSource}`,
        env.TRAFFIC_HASH_SALT
      )

      const existing = await env.PORTFOLIO_DB.prepare(`
        SELECT 1 AS found
        FROM project_interest_votes
        WHERE project_id = ? AND visitor_hash = ?
      `).bind(project, visitorHash).first()

      if (!existing) {
        await env.PORTFOLIO_DB.batch([
          env.PORTFOLIO_DB.prepare(`
            INSERT INTO project_interest_votes (project_id, visitor_hash, created_at)
            VALUES (?, ?, ?)
          `).bind(project, visitorHash, now),
          env.PORTFOLIO_DB.prepare(`
            UPDATE project_metrics
            SET interested = interested + 1, updated_at = ?
            WHERE project_id = ?
          `).bind(now, project),
        ])
      }

      return json({
        configured: true,
        counted: !existing,
        metric: await getMetric(env.PORTFOLIO_DB, project),
      })
    }

    if (body.action === "set") {
      if (
        !env.ADMIN_STATS_TOKEN ||
        request.headers.get("x-admin-token") !== env.ADMIN_STATS_TOKEN
      ) return json({ error: "Unauthorized" }, 401)

      const current = await getMetric(env.PORTFOLIO_DB, project)
      const next = {}

      for (const key of ["users", "accesses", "requests", "interested"]) {
        if (body[key] === undefined) next[key] = current[key]
        else {
          const value = Number(body[key])
          if (!Number.isFinite(value) || value < 0) {
            return json({ error: `${key} harus angka >= 0.` }, 400)
          }
          next[key] = Math.floor(value)
        }
      }

      await env.PORTFOLIO_DB.prepare(`
        UPDATE project_metrics
        SET users = ?, accesses = ?, requests = ?, interested = ?, updated_at = ?
        WHERE project_id = ?
      `).bind(
        next.users, next.accesses, next.requests, next.interested, now, project
      ).run()

      return json({
        configured: true,
        metric: await getMetric(env.PORTFOLIO_DB, project),
      })
    }

    return json({ error: "action tidak dikenal." }, 400)
  } catch {
    return json({
      configured: false,
      reason: "missing_project_metrics_table",
      error: "Jalankan migrations/0002_project_metrics.sql pada D1.",
    }, 503)
  }
}
