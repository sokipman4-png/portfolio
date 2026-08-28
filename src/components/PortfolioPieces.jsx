import { ArrowUpRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TopPrograms } from "@/components/TopPrograms"
import { CurrentProjectCard } from "@/components/CurrentProjectCard"
import { ActivitiesSection } from "@/components/ActivitiesSection"
import { YouTubeSection } from "@/components/YouTubeSection"

export function Stats({ stats, labels }) {
  const items = [
    [stats.projects, labels.projects],
    [compact(stats.sourceLines), labels.lines],
    [compact(stats.sourceFiles), labels.files],
    [stats.technologies, labels.technologies],
  ]
  return (
    <div className="stats-row">
      {items.map(([value, label]) => (
        <div className="stat-item" key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

function compact(value) {
  return new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(value)
}

export function FeaturedProjects({ projects, language, labels, onOpen, variant }) {
  return (
    <section id="work" className={`content-section featured featured--${variant}`}>
      <div className="section-heading">
        <div>
          <span className="ui-kicker">{labels.kicker}</span>
          <h2>{labels.title}</h2>
        </div>
        <p>{labels.body}</p>
      </div>

      <div className="featured-list">
        {projects.map((project, index) => (
          <button className="featured-project" key={project.id} onClick={() => onOpen(project)}>
            <span className="featured-number">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{project.title}</h3>
              <p>{project.description?.[language] || ""}</p>
            </div>
            <ArrowUpRight className="featured-arrow h-5 w-5" />
          </button>
        ))}
      </div>
    </section>
  )
}

export function CurrentProjects({ items, language, labels, metrics, registerInterest, variant }) {
  return (
    <section id="current" className={`content-section current current--${variant}`}>
      <div className="section-heading">
        <div>
          <span className="ui-kicker">{labels.kicker}</span>
          <h2>{labels.title}</h2>
        </div>
        <p>{labels.body}</p>
      </div>

      <div className="space-y-5">
        {items.map((item) => (
          <CurrentProjectCard
            key={item.id}
            item={item}
            language={language}
            labels={labels}
            metric={metrics[item.id]}
            onInterest={registerInterest}
            variant={variant}
          />
        ))}
      </div>
    </section>
  )
}

export function ProjectIndex({
  projects,
  topProjects,
  language,
  labels,
  metrics,
  query,
  setQuery,
  onOpen,
  variant,
}) {
  return (
    <section id="index" className={`content-section index index--${variant}`}>
      <div className="section-heading">
        <div>
          <span className="ui-kicker">{labels.kicker}</span>
          <h2>{labels.title}</h2>
        </div>
        <p>{labels.body}</p>
      </div>

      <TopPrograms
        items={topProjects}
        language={language}
        labels={labels}
        metrics={metrics}
        onOpen={onOpen}
        variant={variant}
      />

      <div className="index-search">
        <Search className="h-4 w-4" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder={labels.placeholder} />
      </div>

      <div className="project-directory">
        {projects.map((project, index) => (
          <button key={project.id} onClick={() => onOpen(project)} className="directory-row">
            <span className="directory-number">{String(index + 1).padStart(2, "0")}</span>
            <strong>{project.title}</strong>
            <span className="directory-open">
              {labels.open} <ArrowUpRight className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}

export function AboutSection({ labels, variant }) {
  return (
    <section id="about" className={`content-section about about--${variant}`}>
      <div className="section-heading">
        <div>
          <span className="ui-kicker">{labels.kicker}</span>
          <h2>{labels.title}</h2>
        </div>
      </div>
      <div className="principles-grid">
        {labels.items.map(([number, title, body]) => (
          <article key={number}>
            <span className="ui-kicker">{number}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ContactSection({ labels, site, variant }) {
  return (
    <section id="contact" className={`content-section contact contact--${variant}`}>
      <span className="ui-kicker">{labels.kicker}</span>
      <h2>{labels.title}</h2>
      <p>{labels.body}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild variant="accent">
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </Button>
        <Button asChild variant="outline">
          <a href={site.github} target="_blank" rel="noreferrer">GitHub</a>
        </Button>
      </div>
    </section>
  )
}

export function MediaSections({ activities, youtube, language, t, variant }) {
  return (
    <>
      <ActivitiesSection items={activities} language={language} labels={t.activities} variant={variant} />
      <YouTubeSection config={youtube} labels={t.videos} variant={variant} />
    </>
  )
}
