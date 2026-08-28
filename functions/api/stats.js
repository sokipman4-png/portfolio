const headers = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
}

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers })

async function getMetric(env, project) {
  if (!env.PORTFOLIO_STATS) return {}
  const raw = await env.PORTFOLIO_STATS.get(`metric:${project}`)
  if (!raw) return {}
  try { return JSON.parse(raw) } catch { return {} }
}

async function saveMetric(env, project, metric) {
  await env.PORTFOLIO_STATS.put(`metric:${project}`, JSON.stringify(metric))
}

async function hashText(value) {
  const bytes = new TextEncoder().encode(value)
  const hash = await crypto.subtle.digest("SHA-256", bytes)
  return [...new Uint8Array(hash)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url)
  const projects = (url.searchParams.get("projects") || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
    .slice(0, 100)

  if (!env.PORTFOLIO_STATS) {
    return json({ mode: "fallback", metrics: {} })
  }

  const pairs = await Promise.all(
    projects.map(async (project) => [project, await getMetric(env, project)])
  )

  return json({ mode: "kv", metrics: Object.fromEntries(pairs) })
}

export async function onRequestPost({ request, env }) {
  if (!env.PORTFOLIO_STATS) {
    return json({ error: "PORTFOLIO_STATS KV belum dikonfigurasi." }, 503)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: "JSON tidak valid." }, 400)
  }

  const project = String(body.project || "").trim()
  if (!project) return json({ error: "project wajib diisi." }, 400)

  const metric = await getMetric(env, project)

  if (body.action === "access") {
    metric.accesses = Number(metric.accesses || 0) + 1
    await saveMetric(env, project, metric)
    return json({ metric })
  }

  if (body.action === "interest") {
    const ip = request.headers.get("CF-Connecting-IP") || "unknown"
    const voteHash = await hashText(`${project}|${ip}`)
    const voteKey = `vote:${project}:${voteHash}`
    const exists = await env.PORTFOLIO_STATS.get(voteKey)

    if (!exists) {
      metric.interested = Number(metric.interested || 0) + 1
      await saveMetric(env, project, metric)
      await env.PORTFOLIO_STATS.put(voteKey, "1", {
        expirationTtl: 31536000,
      })
    }

    return json({ metric, counted: !exists })
  }

  if (body.action === "set") {
    if (
      !env.ADMIN_STATS_TOKEN ||
      request.headers.get("x-admin-token") !== env.ADMIN_STATS_TOKEN
    ) {
      return json({ error: "Unauthorized" }, 401)
    }

    for (const key of ["users", "accesses", "requests", "interested"]) {
      if (body[key] !== undefined && body[key] !== null) {
        const value = Number(body[key])
        if (!Number.isFinite(value) || value < 0) {
          return json({ error: `${key} harus angka >= 0.` }, 400)
        }
        metric[key] = Math.floor(value)
      }
    }

    await saveMetric(env, project, metric)
    return json({ metric })
  }

  return json({ error: "action tidak dikenal." }, 400)
}
