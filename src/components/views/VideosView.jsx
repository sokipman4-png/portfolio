import { useEffect, useState } from "react"
import { ArrowUpRight, Youtube } from "lucide-react"

export function VideosView({ config, labels }) {
  const [remoteVideos, setRemoteVideos] = useState([])

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!config.channelId) return

      try {
        const response = await fetch(
          `/api/youtube?channelId=${encodeURIComponent(config.channelId)}&limit=${config.maxVideos || 6}`
        )

        if (!response.ok) return
        const data = await response.json()

        if (!cancelled) setRemoteVideos(data.videos || [])
      } catch {}
    }

    load()
    return () => {
      cancelled = true
    }
  }, [config.channelId, config.maxVideos])

  const videos = remoteVideos.length
    ? remoteVideos
    : config.manualVideos || []

  return (
    <section className="view-panel generic-view videos-view">
      <div className="generic-view-heading">
        <span className="micro-label">{labels.kicker}</span>
        <h1>{labels.title}</h1>
        <p>{labels.body}</p>
      </div>

      <div className="videos-scroll">
        {videos.length ? (
          <div className="videos-grid-v5">
            {videos.map((video) => (
              <a
                className="video-card-v5"
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noreferrer"
              >
                <div className="video-image">
                  <img
                    src={
                      video.thumbnail ||
                      `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`
                    }
                    alt={video.title}
                    width="320"
                    height="180"
                    loading="lazy"
                    decoding="async"
                  />

                  <span className="youtube-play">
                    <Youtube className="h-5 w-5" />
                  </span>
                </div>

                <div className="video-body">
                  <h2>{video.title}</h2>
                  <span>
                    {labels.watch}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="empty-view">{labels.empty}</div>
        )}
      </div>
    </section>
  )
}
