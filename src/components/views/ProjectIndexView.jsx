import { ArrowUpRight, Eye, Search, Users } from "lucide-react"
import {
  getProjectAccesses,
  getProjectLicense,
  getProjectPrice,
  getProjectUsers,
} from "@/lib/projectBusiness"

export function ProjectIndexView({
  projects,
  language,
  labels,
  metrics,
  query,
  setQuery,
  sort,
  setSort,
  ranking,
  onOpenProject,
}) {
  return (
    <section className="view-panel project-index-view">
      <div className="project-index-header">
        <div className="project-index-copy">
          <span className="micro-label">{labels.kicker}</span>
          <h1>{labels.title}</h1>
          <p>{labels.body}</p>
        </div>

        <div className="project-index-controls">
          <label className="project-search">
            <Search className="h-4 w-4" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={labels.placeholder}
            />
          </label>

          <label className="sort-control">
            <span>{labels.sortLabel}</span>
            <select value={sort} onChange={(event) => setSort(event.target.value)}>
              <option value="users-desc">{labels.sortUsersDesc}</option>
              <option value="users-asc">{labels.sortUsersAsc}</option>
              <option value="access-desc">{labels.sortAccessDesc}</option>
              <option value="price-asc">{labels.sortPriceAsc}</option>
              <option value="price-desc">{labels.sortPriceDesc}</option>
              <option value="az">{labels.sortAZ}</option>
              <option value="za">{labels.sortZA}</option>
            </select>
          </label>
        </div>

        <div className="project-columns" aria-hidden="true">
          <span>Project</span>
          <span>{labels.users}</span>
          <span>{labels.accesses}</span>
          <span>{labels.price}</span>
          <span>{labels.license}</span>
          <span />
        </div>
      </div>

      <div className="project-scroll-area">
        <div className="project-list">
          {projects.map((project) => {
            const live = metrics[project.id]
            const users = getProjectUsers(project, live)
            const accesses = getProjectAccesses(project, live)
            const price = getProjectPrice(project, language, "—")
            const license = getProjectLicense(project, language, "—")
            const rank = ranking.get(project.id)

            return (
              <button
                className="project-row"
                key={project.id}
                onClick={() => onOpenProject(project)}
              >
                <div className="project-name-cell">
                  <div className="project-rank-slot">
                    {rank && rank <= 3 ? (
                      <span className="top-badge">
                        {labels.top} {rank}
                      </span>
                    ) : (
                      <span className="project-rank-muted">
                        {rank ? `#${rank}` : "·"}
                      </span>
                    )}
                  </div>

                  <div className="project-name-wrap">
                    <strong>{project.title}</strong>
                    {project.category && <span>{project.category}</span>}
                  </div>
                </div>

                <Metric icon={<Users />} value={users ?? "—"} />
                <Metric icon={<Eye />} value={accesses} />
                <span className="row-price">{price}</span>
                <span className="row-license">{license}</span>

                <span className="row-open">
                  {labels.open}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Metric({ icon, value }) {
  return (
    <span className="row-metric">
      {icon}
      <b>{value}</b>
    </span>
  )
}
