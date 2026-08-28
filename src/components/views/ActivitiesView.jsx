import { MapPin } from "lucide-react"
import { formatDate } from "@/lib/live"

export function ActivitiesView({ items, language, labels }) {
  return (
    <section className="view-panel generic-view activities-view">
      <div className="generic-view-heading">
        <span className="micro-label">{labels.kicker}</span>
        <h1>{labels.title}</h1>
        <p>{labels.body}</p>
      </div>

      <div className="activities-scroll">
        <div className="activities-grid">
          {items.map((item) => (
            <article className="activity-card-v5" key={item.id}>
              <div className="activity-photo">
                <img
                  src={item.image}
                  alt={item.title?.[language] || item.title?.id}
                  width="960"
                  height="540"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="activity-body">
                <span className="micro-label">
                  {formatDate(item.date, language)}
                </span>

                <h2>{item.title?.[language] || item.title?.id}</h2>

                <div className="activity-location">
                  <MapPin className="h-4 w-4" />
                  {item.location}
                </div>

                <p>
                  {item.description?.[language] || item.description?.id}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
