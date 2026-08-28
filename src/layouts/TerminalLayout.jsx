import { ArrowRight, Github } from "lucide-react"
import {
  AboutSection, ContactSection, CurrentProjects, FeaturedProjects,
  MediaSections, ProjectIndex, Stats
} from "@/components/PortfolioPieces"

export function TerminalLayout(props) {
  const {
    site, t, language, setLanguage, projects, featuredProjects, topProjects,
    currentProjects, activities, youtube, metrics, registerInterest,
    query, setQuery, onOpenProject
  } = props

  const nav = [
    [t.nav.work, "#work"], [t.nav.current, "#current"], [t.nav.index, "#index"],
    [t.nav.activities, "#activities"], [t.nav.videos, "#videos"], [t.nav.about, "#about"]
  ]

  return (
    <div className="design-terminal">
      <aside className="terminal-rail">
        <a href="#top" className="terminal-logo">SR/</a>
        <nav>
          {nav.map(([label, href], i) => (
            <a key={href} href={href}><span>{String(i+1).padStart(2,"0")}</span>{label}</a>
          ))}
        </nav>
        <div className="terminal-rail-bottom">
          <button onClick={() => setLanguage(language === "id" ? "en" : "id")}>lang:{language}</button>
          <a href={site.github} target="_blank" rel="noreferrer"><Github className="h-4 w-4" /></a>
        </div>
      </aside>

      <main id="top" className="terminal-main">
        <section className="terminal-hero">
          <div className="terminal-status">
            <span>portfolio@sihrizal:~$</span>
            <b>system online</b>
          </div>
          <div className="terminal-gridline" />
          <h1>
            <span>{t.hero.line1}</span>
            <span>{t.hero.line2}</span>
            <span className="terminal-accent">{t.hero.line3}</span>
          </h1>
          <p>{t.hero.body}</p>

          <div className="terminal-command-row">
            <a href="#work">./projects <ArrowRight className="h-4 w-4" /></a>
            <a href="#current">./in-progress <ArrowRight className="h-4 w-4" /></a>
          </div>

          <div className="terminal-profile-mini">
            <img src={site.profileImage} alt={t.bio.photoAlt} width="640" height="760" />
            <div>
              <span className="ui-kicker">{t.bio.kicker}</span>
              <h2>{t.bio.title}</h2>
              <p>{t.bio.body1}</p>
            </div>
          </div>

          <Stats stats={site.stats} labels={t.stats} />
        </section>

        <FeaturedProjects projects={featuredProjects} language={language} labels={t.featured} onOpen={onOpenProject} variant="terminal" />
        <CurrentProjects items={currentProjects} language={language} labels={t.current} metrics={metrics} registerInterest={registerInterest} variant="terminal" />
        <ProjectIndex projects={projects} topProjects={topProjects} language={language} labels={t.index} metrics={metrics} query={query} setQuery={setQuery} onOpen={onOpenProject} variant="terminal" />
        <MediaSections activities={activities} youtube={youtube} language={language} t={t} variant="terminal" />
        <AboutSection labels={t.approach} variant="terminal" />
        <ContactSection labels={t.contact} site={site} variant="terminal" />
      </main>
      <footer className="terminal-footer">EOF // {site.brand} // {new Date().getFullYear()}</footer>
    </div>
  )
}
