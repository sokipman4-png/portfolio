import { ArrowUpRight, Github, Mail } from "lucide-react"

export function ContactView({ site, labels }) {
  return (
    <section className="view-panel contact-view-v5">
      <div className="contact-card-v5">
        <span className="micro-label">{labels.kicker}</span>
        <h1>{labels.title}</h1>
        <p>{labels.body}</p>

        <div className="contact-actions-v5">
          <a href={`mailto:${site.email}`}>
            <Mail className="h-5 w-5" />
            <span>{site.email}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>

          <a href={site.github} target="_blank" rel="noreferrer">
            <Github className="h-5 w-5" />
            <span>GitHub</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
