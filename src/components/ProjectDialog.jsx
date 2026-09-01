import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  getProjectAccesses,
  getProjectLicense,
  getProjectPrice,
  getProjectUsers,
} from "@/lib/projectBusiness"

export function ProjectDialog({
  project,
  open,
  onOpenChange,
  language,
  labels,
  liveMetric,
}) {
  if (!project) return null

  const users = getProjectUsers(project, liveMetric)
  const accesses = getProjectAccesses(project, liveMetric)
  const price = getProjectPrice(project, language, labels.notSet)
  const license = getProjectLicense(project, language, labels.notSet)

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
          <Metric label={labels.price} value={price} />
          <Metric label={labels.license} value={license} />
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
