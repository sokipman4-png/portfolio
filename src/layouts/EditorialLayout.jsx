import { ArrowDownRight, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  AboutSection, ContactSection, CurrentProjects, FeaturedProjects,
  MediaSections, ProjectIndex, Stats
} from "@/components/PortfolioPieces"

export function EditorialLayout(props) {
  const {
    site, t, language, setLanguage, projects, featuredProjects, topProjects,
    currentProjects, activities, youtube, metrics, registerInterest,
    query, setQuery, onOpenProject
  } = props
  const [mobile, setMobile] = useState(false)

  const nav = [
    [t.nav.work, "#work"], [t.nav.index, "#index"], [t.nav.current, "#current"],
    [t.nav.activities, "#activities"], [t.nav.videos, "#videos"],
    [t.nav.about, "#about"], [t.nav.contact, "#contact"]
  ]

  return (
    <div className="design-editorial">
      <header className="editorial-header">
        <a href="#top" className="brand-mark"><b>SR</b><span>{site.brand} / dev</span></a>
        <nav>
          {nav.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          <button onClick={() => setLanguage(language === "id" ? "en" : "id")}>{language.toUpperCase()}</button>
        </nav>
        <button className="editorial-menu" onClick={() => setMobile(!mobile)}>
          {mobile ? <X /> : <Menu />}
        </button>
        {mobile && (
          <div className="editorial-mobile-nav">
            {nav.map(([label, href]) => <a key={href} href={href} onClick={() => setMobile(false)}>{label}</a>)}
          </div>
        )}
      </header>

      <main id="top" className="editorial-shell">
        <section className="editorial-hero">
          <div className="editorial-hero-copy">
            <p className="ui-kicker"><span className="status-dot" />{t.hero.eyebrow}</p>
            <h1>
              <span>{t.hero.line1}</span>
              <span className="muted-line">{t.hero.line2}</span>
              <span>{t.hero.line3}</span>
            </h1>
            <p className="hero-body">{t.hero.body}</p>
            <div className="hero-actions">
              <Button asChild variant="accent"><a href="#work">{t.hero.cta}<ArrowDownRight className="h-4 w-4" /></a></Button>
              <Button asChild variant="outline"><a href="#current">{t.hero.currentCta}</a></Button>
            </div>
            <Stats stats={site.stats} labels={t.stats} />
          </div>

          <aside className="editorial-profile">
            <img src={site.profileImage} alt={t.bio.photoAlt} width="640" height="760" decoding="async" />
            <div className="editorial-profile-copy">
              <span className="ui-kicker">{t.bio.kicker}</span>
              <h2>{t.bio.title}</h2>
              <p>{t.bio.body1}</p>
              <p>{t.bio.body2}</p>
              <div className="focus-list">
                {t.bio.focus.map((item, index) => <span key={item}>{String(index+1).padStart(2,"0")} / {item}</span>)}
              </div>
            </div>
          </aside>
        </section>
      </main>

      <div className="ticker">
        <div>{[...site.featuredTechnologies, ...site.featuredTechnologies].map((tech, i) => <span key={`${tech}-${i}`}>{tech}<b>✦</b></span>)}</div>
      </div>

      <main className="editorial-shell">
        <FeaturedProjects projects={featuredProjects} language={language} labels={t.featured} onOpen={onOpenProject} variant="editorial" />
        <CurrentProjects items={currentProjects} language={language} labels={t.current} metrics={metrics} registerInterest={registerInterest} variant="editorial" />
        <ProjectIndex projects={projects} topProjects={topProjects} language={language} labels={t.index} metrics={metrics} query={query} setQuery={setQuery} onOpen={onOpenProject} variant="editorial" />
        <MediaSections activities={activities} youtube={youtube} language={language} t={t} variant="editorial" />
        <AboutSection labels={t.approach} variant="editorial" />
        <ContactSection labels={t.contact} site={site} variant="editorial" />
      </main>
      <footer className="editorial-footer">© {new Date().getFullYear()} {site.brand}</footer>
    </div>
  )
}
