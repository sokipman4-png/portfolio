import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export function ProjectDialog({
  project,
  open,
  onOpenChange,
  language,
  labels,
  liveMetric,
}) {
  if (!project) return null

  const business = project.business || {}
  const users = liveMetric?.users ?? business.users
  const accesses = liveMetric?.accesses ?? business.accesses ?? 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <div className="project-detail-head">
          <p className="micro-label">{labels.kicker}</p>

          <DialogTitle className="project-detail-title">
            {project.title}
          </DialogTitle>

          <DialogDescription className="project-detail-description">
            {project.description?.[language] || labels.noDescription}
          </DialogDescription>
        </div>

        <div className="project-detail-metrics">
          <Metric label={labels.users} value={users ?? labels.notSet} />
          <Metric label={labels.accesses} value={accesses} />
          <Metric
            label={labels.price}
            value={
              business.price?.[language] ||
              business.price?.id ||
              labels.notSet
            }
          />
          <Metric
            label={labels.license}
            value={
              business.license?.[language] ||
              business.license?.id ||
              labels.notSet
            }
          />
        </div>

        {project.platforms?.length > 0 && (
          <section className="project-detail-section">
            <h3 className="micro-label">{labels.platforms}</h3>
            <div className="project-detail-badges">
              {project.platforms.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </section>
        )}

        {project.highlights?.[language]?.length > 0 && (
          <section className="project-detail-section">
            <h3 className="micro-label">{labels.highlights}</h3>

            <ul className="project-highlight-list">
              {project.highlights[language].map((item) => (
                <li key={item}>
                  <span />
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </DialogContent>
    </Dialog>
  )
}

function Metric({ label, value }) {
  return (
    <div>
      <span className="micro-label">{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
