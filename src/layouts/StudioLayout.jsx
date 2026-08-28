import { ArrowDown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  AboutSection, ContactSection, CurrentProjects, FeaturedProjects,
  MediaSections, ProjectIndex, Stats
} from "@/components/PortfolioPieces"

export function StudioLayout(props) {
  const {
    site, t, language, setLanguage, projects, featuredProjects, topProjects,
    currentProjects, activities, youtube, metrics, registerInterest,
    query, setQuery, onOpenProject
  } = props

  const nav = [
    [t.nav.work, "#work"], [t.nav.index, "#index"], [t.nav.current, "#current"],
    [t.nav.activities, "#activities"], [t.nav.videos, "#videos"], [t.nav.contact, "#contact"]
  ]

  return (
    <div className="design-studio">
      <header className="studio-header">
        <a href="#top" className="studio-brand"><span>SR</span>{site.brand}</a>
        <nav>{nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <button className="studio-lang" onClick={() => setLanguage(language === "id" ? "en" : "id")}>{language.toUpperCase()}</button>
      </header>

      <main id="top" className="studio-main">
        <section className="studio-hero">
          <div className="studio-pill"><Sparkles className="h-4 w-4" /> {t.hero.eyebrow}</div>
          <h1>{t.hero.line1} <em>{t.hero.line2}</em> {t.hero.line3}</h1>
          <p>{t.hero.body}</p>
          <div className="studio-actions">
            <Button asChild variant="accent"><a href="#work">{t.hero.cta}</a></Button>
            <Button asChild variant="outline"><a href="#current">{t.hero.currentCta}</a></Button>
          </div>
          <a href="#work" className="studio-scroll"><ArrowDown className="h-4 w-4" /></a>
        </section>

        <section className="studio-intro">
          <div className="studio-photo-wrap">
            <img src={site.profileImage} alt={t.bio.photoAlt} width="640" height="760" />
          </div>
          <div className="studio-intro-copy">
            <span className="ui-kicker">{t.bio.kicker}</span>
            <h2>{t.bio.title}</h2>
            <p>{t.bio.body1}</p>
            <p>{t.bio.body2}</p>
            <div className="studio-focus">
              {t.bio.focus.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
          <Stats stats={site.stats} labels={t.stats} />
        </section>

        <FeaturedProjects projects={featuredProjects} language={language} labels={t.featured} onOpen={onOpenProject} variant="studio" />
        <CurrentProjects items={currentProjects} language={language} labels={t.current} metrics={metrics} registerInterest={registerInterest} variant="studio" />
        <ProjectIndex projects={projects} topProjects={topProjects} language={language} labels={t.index} metrics={metrics} query={query} setQuery={setQuery} onOpen={onOpenProject} variant="studio" />
        <MediaSections activities={activities} youtube={youtube} language={language} t={t} variant="studio" />
        <AboutSection labels={t.approach} variant="studio" />
        <ContactSection labels={t.contact} site={site} variant="studio" />
      </main>

      <footer className="studio-footer">Made by {site.brand} · {new Date().getFullYear()}</footer>
    </div>
  )
}
