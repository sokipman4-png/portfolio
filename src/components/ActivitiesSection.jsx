import { MapPin } from "lucide-react"
import { formatDate } from "@/lib/live"

export function ActivitiesSection({ items, language, labels, variant }) {
  return (
    <section id="activities" className={`content-section activities activities--${variant}`}>
      <div className="section-heading">
        <div>
          <span className="ui-kicker">{labels.kicker}</span>
          <h2>{labels.title}</h2>
        </div>
        <p>{labels.body}</p>
      </div>

      <div className="activity-grid">
        {items.map((item) => (
          <article className="activity-card" key={item.id}>
            <div className="activity-image">
              <img
                src={item.image}
                alt={item.title?.[language] || item.title?.id}
                width="960"
                height="540"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="activity-copy">
              <span className="ui-kicker">{formatDate(item.date, language)}</span>
              <h3>{item.title?.[language] || item.title?.id}</h3>
              <div className="activity-location">
                <MapPin className="h-3.5 w-3.5" />
                {item.location}
              </div>
              <p>{item.description?.[language] || item.description?.id}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
