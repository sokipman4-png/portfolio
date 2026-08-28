import {
  onRequestGet as trafficGet,
  onRequestPost as trafficPost,
} from "../functions/api/traffic.js"

import {
  onRequestGet as statsGet,
  onRequestPost as statsPost,
} from "../functions/api/stats.js"

import {
  onRequestGet as youtubeGet,
} from "../functions/api/youtube.js"

const API_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cache-Control": "no-store",
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...API_HEADERS,
    },
  })
}

function secure(response) {
  const result = new Response(response.body, response)

  for (const [name, value] of Object.entries(API_HEADERS)) {
    result.headers.set(name, value)
  }

  return result
}

function sameOriginAllowed(request) {
  if (!["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
    return true
  }

  const origin = request.headers.get("Origin")

  // curl/CLI requests may not send Origin.
  if (!origin) return true

  return origin === new URL(request.url).origin
}

async function routeApi(request, env) {
  const url = new URL(request.url)

  if (!sameOriginAllowed(request)) {
    return json({ error: "Forbidden" }, 403)
  }

  if (url.pathname === "/api/traffic") {
    if (request.method === "GET") {
      return secure(await trafficGet({ request, env }))
    }

    if (request.method === "POST") {
      return secure(await trafficPost({ request, env }))
    }

    return json({ error: "Method not allowed" }, 405)
  }

  if (url.pathname === "/api/stats") {
    if (request.method === "GET") {
      return secure(await statsGet({ request, env }))
    }

    if (request.method === "POST") {
      return secure(await statsPost({ request, env }))
    }

    return json({ error: "Method not allowed" }, 405)
  }

  if (url.pathname === "/api/youtube") {
    if (request.method === "GET") {
      return secure(await youtubeGet({ request, env }))
    }

    return json({ error: "Method not allowed" }, 405)
  }

  return json({ error: "API route not found" }, 404)
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    if (url.pathname.startsWith("/api/")) {
      return routeApi(request, env)
    }

    return env.ASSETS.fetch(request)
  },
}
