const headers = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "public, max-age=600, s-maxage=600",
}

const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers })

const decodeXml = (value = "") => value
  .replaceAll("&amp;", "&")
  .replaceAll("&lt;", "<")
  .replaceAll("&gt;", ">")
  .replaceAll("&quot;", '"')
  .replaceAll("&#39;", "'")

function match(entry, regex) {
  const result = entry.match(regex)
  return result?.[1] ? decodeXml(result[1].trim()) : ""
}

export async function onRequestGet({ request }) {
  const url = new URL(request.url)
  const channelId = (url.searchParams.get("channelId") || "").trim()
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || 6), 1), 12)

  if (!/^UC[\w-]{10,}$/.test(channelId)) return json({ error: "Channel ID tidak valid." }, 400)

  const response = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`, {
    cf: { cacheTtl: 600, cacheEverything: true },
  })
  if (!response.ok) return json({ error: "Gagal mengambil feed YouTube." }, 502)

  const xml = await response.text()
  const videos = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, limit).map((m) => {
    const entry = m[1]
    const id = match(entry, /<yt:videoId>([\s\S]*?)<\/yt:videoId>/)
    return {
      id,
      title: match(entry, /<title>([\s\S]*?)<\/title>/),
      publishedAt: match(entry, /<published>([\s\S]*?)<\/published>/),
      url: `https://www.youtube.com/watch?v=${id}`,
      thumbnail: `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
    }
  }).filter(v => v.id)

  return json({ videos })
}
