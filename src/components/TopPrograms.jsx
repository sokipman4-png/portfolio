import { ArrowUpRight } from "lucide-react"

export function TopPrograms({ items, language, labels, metrics, onOpen, variant }) {
  if (!items.length) return null

  return (
    <section className={`top-programs top-programs--${variant}`}>
      <div className="top-programs-heading">
        <div>
          <span className="ui-kicker">{labels.topKicker}</span>
          <h3>{labels.topTitle}</h3>
        </div>
        <p>{labels.topBody}</p>
      </div>

      <div className="top-program-grid">
        {items.map((project, index) => {
          const live = metrics?.[project.id] || {}
          const users = live.users ?? project.business?.users
          return (
            <button key={project.id} className="top-program-card" onClick={() => onOpen(project)}>
              <div className="flex items-center justify-between">
                <span className="ui-kicker">#{String(index + 1).padStart(2, "0")}</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
              <h4>{project.title}</h4>
              <dl>
                <Row label={labels.users} value={users ?? "—"} />
                <Row label={labels.license} value={project.business?.license?.[language] || project.business?.license?.id || "—"} />
                <Row label={labels.price} value={project.business?.price?.[language] || project.business?.price?.id || "—"} />
              </dl>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function Row({ label, value }) {
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
