const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), accelerometer=(), gyroscope=(), magnetometer=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cache-Control": "no-store",
}

export async function onRequest(context) {
  const { request } = context

  // POST dari browser harus same-origin.
  if (
    request.method === "POST" ||
    request.method === "PUT" ||
    request.method === "PATCH" ||
    request.method === "DELETE"
  ) {
    const origin = request.headers.get("Origin")

    if (origin) {
      const ownOrigin = new URL(request.url).origin

      if (origin !== ownOrigin) {
        return new Response("Forbidden", {
          status: 403,
          headers: SECURITY_HEADERS,
        })
      }
    }
  }

  const response = await context.next()
  const result = new Response(response.body, response)

  for (const [name, value] of Object.entries(
    SECURITY_HEADERS
  )) {
    result.headers.set(name, value)
  }

  return result
}
