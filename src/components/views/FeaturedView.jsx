import { ArrowUpRight, Eye, Users } from "lucide-react"

export function FeaturedView({
  projects,
  language,
  metrics,
  onOpenProject,
}) {
  return (
    <section className="view-panel featured-view">
      <div className="featured-grid">
        {projects.map((project, index) => {
          const live = metrics[project.id] || {}
          const users = live.users ?? project.business?.users
          const accesses = live.accesses ?? project.business?.accesses ?? 0

          return (
            <button
              className="featured-card"
              key={project.id}
              onClick={() => onOpenProject(project)}
            >
              <div className="featured-card-top">
                <span className="project-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <ArrowUpRight className="h-5 w-5" />
              </div>

              <div className="featured-card-main">
                <h2>{project.title}</h2>
                <p>{project.description?.[language]}</p>
              </div>

              <div className="featured-card-meta">
                <span>
                  <Users className="h-4 w-4" />
                  {users ?? "—"}
                </span>
                <span>
                  <Eye className="h-4 w-4" />
                  {accesses}
                </span>
                <span className="featured-price">
                  {project.business?.price?.[language] ||
                    project.business?.price?.id ||
                    "—"}
                </span>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
