import { useEffect, useState } from "react"
import { ArrowUpRight, Youtube } from "lucide-react"

export function YouTubeSection({ config, labels, variant }) {
  const [remote, setRemote] = useState([])

  useEffect(() => {
    let cancelled = false
    async function load() {
      if (!config.channelId) return
      try {
        const response = await fetch(`/api/youtube?channelId=${encodeURIComponent(config.channelId)}&limit=${config.maxVideos || 6}`)
        if (!response.ok) return
        const data = await response.json()
        if (!cancelled) setRemote(data.videos || [])
      } catch {
        // local fallback
      }
    }
    load()
    return () => { cancelled = true }
  }, [config.channelId, config.maxVideos])

  const videos = remote.length ? remote : (config.manualVideos || [])

  return (
    <section id="videos" className={`content-section videos videos--${variant}`}>
      <div className="section-heading">
        <div>
          <span className="ui-kicker">{labels.kicker}</span>
          <h2>{labels.title}</h2>
        </div>
        <p>{labels.body}</p>
      </div>

      {videos.length ? (
        <div className="video-grid">
          {videos.map((video) => (
            <a key={video.id} href={video.url} target="_blank" rel="noreferrer" className="video-card">
              <div className="video-thumb">
                <img
                  src={video.thumbnail || `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  width="320"
                  height="180"
                  loading="lazy"
                  decoding="async"
                />
                <span><Youtube className="h-4 w-4" /></span>
              </div>
              <div className="video-copy">
                <h3>{video.title}</h3>
                <span className="ui-kicker inline-flex items-center gap-2">
                  {labels.watch} <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <div className="empty-state">{labels.empty}</div>
      )}
    </section>
  )
}
