const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store, max-age=0",
}

const TIME_ZONE = "Asia/Jakarta"
const ACTIVE_WINDOW_SECONDS = 90

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  })
}

function jakartaDay(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date)

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value])
  )

  return `${values.year}-${values.month}-${values.day}`
}

function shiftDay(day, amount) {
  const [year, month, date] = day.split("-").map(Number)
  const value = new Date(Date.UTC(year, month - 1, date))
  value.setUTCDate(value.getUTCDate() + amount)
  return value.toISOString().slice(0, 10)
}

function dayRange(endDay, days) {
  return shiftDay(endDay, -(days - 1))
}

async function hashVisitor(visitorId, env) {
  const salt = env.TRAFFIC_HASH_SALT
  if (!salt) return null

  const input = new TextEncoder().encode(`${salt}|${visitorId}`)
  const digest = await crypto.subtle.digest("SHA-256", input)

  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
}

async function ensureDatabase(env) {
  return Boolean(env.PORTFOLIO_DB)
}

async function getCount(db, sql, ...bindings) {
  const row = await db.prepare(sql).bind(...bindings).first()
  return Number(row?.count || 0)
}

export async function onRequestPost({ request, env }) {
  if (!(await ensureDatabase(env))) {
    return json({
      configured: false,
      error: "PORTFOLIO_DB binding belum tersedia.",
    }, 503)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: "Body JSON tidak valid." }, 400)
  }

  const visitorId = String(body.visitorId || "").trim()
  const event = body.event === "pageview" ? "pageview" : "heartbeat"

  if (visitorId.length < 12 || visitorId.length > 200) {
    return json({ error: "visitorId tidak valid." }, 400)
  }

  const visitorHash = await hashVisitor(visitorId, env)
  if (!visitorHash) {
    return json({
      configured: false,
      error: "TRAFFIC_HASH_SALT belum dikonfigurasi.",
    }, 503)
  }

  const now = Math.floor(Date.now() / 1000)
  const day = jakartaDay()

  // Presence dipakai untuk menghitung user yang aktif dalam 90 detik terakhir.
  await env.PORTFOLIO_DB
    .prepare(`
      INSERT INTO traffic_presence (visitor_hash, last_seen)
      VALUES (?, ?)
      ON CONFLICT(visitor_hash)
      DO UPDATE SET last_seen = excluded.last_seen
    `)
    .bind(visitorHash, now)
    .run()

  // Visitor unik per hari. Heartbeat hanya update last_seen.
  if (event === "pageview") {
    await env.PORTFOLIO_DB
      .prepare(`
        INSERT INTO traffic_daily (
          day,
          visitor_hash,
          first_seen,
          last_seen,
          pageviews
        )
        VALUES (?, ?, ?, ?, 1)
        ON CONFLICT(day, visitor_hash)
        DO UPDATE SET
          last_seen = excluded.last_seen,
          pageviews = traffic_daily.pageviews + 1
      `)
      .bind(day, visitorHash, now, now)
      .run()
  } else {
    await env.PORTFOLIO_DB
      .prepare(`
        INSERT INTO traffic_daily (
          day,
          visitor_hash,
          first_seen,
          last_seen,
          pageviews
        )
        VALUES (?, ?, ?, ?, 1)
        ON CONFLICT(day, visitor_hash)
        DO UPDATE SET last_seen = excluded.last_seen
      `)
      .bind(day, visitorHash, now, now)
      .run()
  }

  // Bersihkan presence lama sesekali. traffic_daily tetap menjadi histori.
  if (Math.random() < 0.02) {
    await env.PORTFOLIO_DB
      .prepare("DELETE FROM traffic_presence WHERE last_seen < ?")
      .bind(now - 86400)
      .run()
  }

  return json({
    configured: true,
    ok: true,
  })
}

export async function onRequestGet({ env }) {
  if (!(await ensureDatabase(env))) {
    return json({
      configured: false,
      current: 0,
      today: 0,
      week: 0,
      month: 0,
      year: 0,
      series: [],
    })
  }

  const now = Math.floor(Date.now() / 1000)
  const today = jakartaDay()
  const weekStart = dayRange(today, 7)
  const monthStart = dayRange(today, 30)
  const yearStart = dayRange(today, 365)

  const [
    current,
    todayCount,
    weekCount,
    monthCount,
    yearCount,
    seriesResult,
  ] = await Promise.all([
    getCount(
      env.PORTFOLIO_DB,
      "SELECT COUNT(*) AS count FROM traffic_presence WHERE last_seen >= ?",
      now - ACTIVE_WINDOW_SECONDS
    ),
    getCount(
      env.PORTFOLIO_DB,
      "SELECT COUNT(*) AS count FROM traffic_daily WHERE day = ?",
      today
    ),
    getCount(
      env.PORTFOLIO_DB,
      "SELECT COUNT(DISTINCT visitor_hash) AS count FROM traffic_daily WHERE day BETWEEN ? AND ?",
      weekStart,
      today
    ),
    getCount(
      env.PORTFOLIO_DB,
      "SELECT COUNT(DISTINCT visitor_hash) AS count FROM traffic_daily WHERE day BETWEEN ? AND ?",
      monthStart,
      today
    ),
    getCount(
      env.PORTFOLIO_DB,
      "SELECT COUNT(DISTINCT visitor_hash) AS count FROM traffic_daily WHERE day BETWEEN ? AND ?",
      yearStart,
      today
    ),
    env.PORTFOLIO_DB
      .prepare(`
        SELECT
          day,
          COUNT(*) AS visitors,
          SUM(pageviews) AS pageviews
        FROM traffic_daily
        WHERE day BETWEEN ? AND ?
        GROUP BY day
        ORDER BY day ASC
      `)
      .bind(monthStart, today)
      .all(),
  ])

  const rows = new Map(
    (seriesResult.results || []).map((row) => [
      row.day,
      {
        visitors: Number(row.visitors || 0),
        pageviews: Number(row.pageviews || 0),
      },
    ])
  )

  const series = []
  for (let index = 0; index < 30; index += 1) {
    const day = shiftDay(monthStart, index)
    const value = rows.get(day) || { visitors: 0, pageviews: 0 }
    series.push({
      day,
      visitors: value.visitors,
      pageviews: value.pageviews,
    })
  }

  return json({
    configured: true,
    timeZone: TIME_ZONE,
    activeWindowSeconds: ACTIVE_WINDOW_SECONDS,
    current,
    today: todayCount,
    week: weekCount,
    month: monthCount,
    year: yearCount,
    series,
  })
}
