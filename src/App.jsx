import { useEffect, useMemo, useState } from "react"
import { ArrowDownRight, ArrowUpRight, Github, Menu, Search, X } from "lucide-react"
import scan from "@/data/portfolio_scan.json"
import { copy, projectNotes, site } from "@/data/site-content"
import { Button } from "@/components/ui/button"
import { ProjectDialog } from "@/components/ProjectDialog"
import { ThemeToggle } from "@/components/ThemeToggle"
import { LanguageGate } from "@/components/LanguageGate"
import { LanguageSwitch } from "@/components/LanguageSwitch"
import { formatCompact } from "@/lib/utils"

const featuredNames = [
  "ai_agent_world_v15",
  "esp32",
  "produk-digital",
  "remi",
  "jaga-panen",
  "my_agent",
]

export default function App() {
  const savedLanguage = localStorage.getItem("portfolio-language")
  const [language, setLanguage] = useState(savedLanguage || "id")
  const [languageGateOpen, setLanguageGateOpen] = useState(!savedLanguage)
  const [selectedProject, setSelectedProject] = useState(null)
  const [query, setQuery] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(() => localStorage.getItem("portfolio-theme") === "dark")

  const t = copy[language]

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
    localStorage.setItem("portfolio-theme", dark ? "dark" : "light")
  }, [dark])

  useEffect(() => {
    document.documentElement.lang = language === "id" ? "id" : "en"
  }, [language])

  const chooseLanguage = (value) => {
    setLanguage(value)
    localStorage.setItem("portfolio-language", value)
    setLanguageGateOpen(false)
  }

  const changeLanguage = (value) => {
    setLanguage(value)
    localStorage.setItem("portfolio-language", value)
  }

  const featured = featuredNames
    .map((name) => scan.projects.find((project) => project.name === name))
    .filter(Boolean)

  const publicProjects = useMemo(
    () => scan.projects.filter((project) => !site.hiddenProjects.includes(project.name)),
    []
  )

  const projects = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return publicProjects
    return publicProjects.filter((project) => project.name.toLowerCase().includes(term))
  }, [query, publicProjects])

  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-accent selection:text-slate-950">
      <LanguageGate open={languageGateOpen} content={t.languageGate} onChoose={chooseLanguage} />

      <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid h-8 w-8 place-items-center bg-ink font-mono text-[10px] font-bold text-paper">
              SR
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em]">
              {site.brand} / dev
            </span>
          </a>

          <nav className="hidden items-center gap-7 text-sm md:flex">
            <a className="nav-link" href="#work">{t.nav.work}</a>
            <a className="nav-link" href="#index">{t.nav.index}</a>
            <a className="nav-link" href="#about">{t.nav.about}</a>
            <a className="nav-link" href="#contact">{t.nav.contact}</a>
            <LanguageSwitch language={language} onChange={changeLanguage} />
            <ThemeToggle dark={dark} onToggle={() => setDark((value) => !value)} />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitch language={language} onChange={changeLanguage} />
            <ThemeToggle dark={dark} onToggle={() => setDark((value) => !value)} />
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Open navigation"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="border-t border-line px-5 py-4 md:hidden">
            <div className="flex flex-col">
              {[
                [t.nav.work, "#work"],
                [t.nav.index, "#index"],
                [t.nav.about, "#about"],
                [t.nav.contact, "#contact"],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-line py-3 text-lg font-medium"
                >
                  {label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main id="top">
        <section className="mx-auto max-w-[1440px] border-x border-line">
          <div className="grid min-h-[calc(100svh-64px)] lg:grid-cols-[minmax(0,1.55fr)_minmax(320px,.55fr)]">
            <div className="flex flex-col justify-between px-5 pb-7 pt-16 md:px-8 md:pt-24 lg:px-12 lg:pb-10 lg:pt-28">
              <div>
                <div className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  {t.hero.eyebrow}
                </div>

                <h1 className="max-w-[1080px] text-[clamp(3.7rem,8.7vw,9rem)] font-semibold leading-[.88] tracking-[-.075em]">
                  <span className="block">{t.hero.line1}</span>
                  <span className="block text-muted/65">{t.hero.line2}</span>
                  <span className="block">{t.hero.line3}</span>
                </h1>

                <p className="mt-8 max-w-[690px] text-base leading-7 text-muted md:text-lg md:leading-8">
                  {t.hero.body}
                </p>

                <div className="mt-8">
                  <Button asChild variant="accent">
                    <a href="#work">
                      {t.hero.cta} <ArrowDownRight className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div className="mt-16 flex flex-wrap gap-x-8 gap-y-5 border-t border-line pt-6">
                <Stat value={scan.projects.length} label={t.stats.projects} />
                <Stat value={formatCompact(scan.source_lines)} label={t.stats.lines} />
                <Stat value={formatCompact(scan.source_files)} label={t.stats.files} />
                <Stat value={scan.technologies.length} label={t.stats.technologies} />
              </div>
            </div>

            <aside className="flex flex-col border-t border-line p-5 md:p-8 lg:border-l lg:border-t-0 lg:p-9">
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">
                  {t.bio.kicker}
                </p>
                <h2 className="mt-4 text-3xl font-semibold tracking-[-.05em] md:text-4xl">
                  {t.bio.title}
                </h2>
                <p className="mt-5 text-sm leading-7 text-muted">{t.bio.body1}</p>
                <p className="mt-4 text-sm leading-7 text-muted">{t.bio.body2}</p>

                <div className="mt-9 border-t border-line pt-5">
                  <span className="font-mono text-[9px] uppercase tracking-[.16em] text-muted">
                    {t.bio.focusLabel}
                  </span>
                  <div className="mt-3 divide-y divide-line border-y border-line">
                    {t.bio.focus.map((item, index) => (
                      <div key={item} className="flex items-center gap-3 py-3 text-sm">
                        <span className="font-mono text-[9px] text-muted">0{index + 1}</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="overflow-hidden border-y border-line bg-ink py-3 text-paper">
          <div className="marquee-track flex w-max animate-marquee-slow items-center">
            {[...site.featuredTechnologies, ...site.featuredTechnologies].map((tech, index) => (
              <span key={`${tech}-${index}`} className="flex items-center">
                <span className="px-5 font-mono text-[10px] uppercase tracking-[0.17em] opacity-80">
                  {tech}
                </span>
                <span className="text-accent">✦</span>
              </span>
            ))}
          </div>
        </section>

        <section id="work" className="mx-auto max-w-[1440px] border-x border-line">
          <SectionLead
            number="02"
            label={t.featured.kicker}
            title={t.featured.title}
            copyText={t.featured.body}
          />

          <div className="divide-y divide-line border-t border-line">
            {featured.map((project, index) => {
              const note = projectNotes[project.name]
              return (
                <button
                  key={project.name}
                  className="project-row group grid w-full text-left md:grid-cols-[80px_1fr_1fr_52px]"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="hidden border-r border-line px-5 py-7 font-mono text-[10px] text-muted md:block">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="px-5 py-7 md:px-8 md:py-9">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      {t.project.kicker}
                    </span>
                    <h3 className="mt-3 text-3xl font-semibold tracking-[-0.045em] md:text-5xl">
                      {note?.title || project.name}
                    </h3>
                  </div>

                  <div className="px-5 pb-7 md:px-8 md:py-9">
                    <p className="max-w-xl text-sm leading-7 text-muted">
                      {note?.[language] || t.project.noDescription}
                    </p>
                  </div>

                  <div className="hidden place-items-center border-l border-line md:grid">
                    <ArrowUpRight className="h-5 w-5 transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1" />
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <section id="index" className="mx-auto max-w-[1440px] border-x border-t border-line">
          <SectionLead
            number="03"
            label={t.index.kicker}
            title={t.index.title}
            copyText={t.index.body}
          />

          <div className="border-t border-line p-5 md:p-8">
            <label className="flex min-h-11 max-w-lg items-center gap-3 border border-line bg-panel px-4">
              <Search className="h-4 w-4 text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.index.placeholder}
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted/65"
              />
            </label>

            <div className="mt-7 overflow-hidden border-y border-line">
              <div className="divide-y divide-line">
                {projects.map((project, index) => (
                  <button
                    key={project.path}
                    onClick={() => setSelectedProject(project)}
                    className="group grid w-full grid-cols-[44px_1fr_auto] items-center gap-3 px-4 py-4 text-left transition hover:bg-panel md:grid-cols-[70px_1fr_auto] md:py-5"
                  >
                    <span className="font-mono text-[10px] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <strong className="truncate text-sm md:text-base">
                      {projectNotes[project.name]?.title || project.name}
                    </strong>
                    <span className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[.12em] text-muted">
                      <span className="hidden sm:inline">{t.index.open}</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[.13em] text-muted">
              {t.index.showing} {projects.length} {t.index.of} {publicProjects.length} {t.index.projects}
            </p>
          </div>
        </section>

        <section id="about" className="mx-auto grid max-w-[1440px] border-x border-t border-line lg:grid-cols-2">
          <div className="border-b border-line p-5 md:p-8 lg:border-b-0 lg:border-r">
            <span className="font-mono text-[10px] uppercase tracking-[.17em] text-muted">04 / {t.approach.kicker}</span>
            <h2 className="mt-4 max-w-xl text-5xl font-semibold tracking-[-.06em] md:text-7xl">
              {t.approach.title}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2">
            {t.approach.items.map(([number, title, body], index) => (
              <Principle
                key={number}
                number={number}
                title={title}
                copyText={body}
                border={index % 2 === 1}
                top={index >= 2}
              />
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-[1440px] border-x border-y border-line px-5 py-16 md:px-8 md:py-24 lg:px-12">
          <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[.17em] text-muted">
                {t.contact.kicker}
              </span>
              <h2 className="mt-4 max-w-5xl text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[.9] tracking-[-.075em]">
                {t.contact.title}
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-muted">{t.contact.body}</p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button asChild variant="accent">
                <a href={`mailto:${site.email}`}>
                  {site.email} <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={site.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" /> GitHub
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-7 font-mono text-[10px] uppercase tracking-[.13em] text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <span>© {new Date().getFullYear()} {site.brand}</span>
        <button className="hover:text-ink" onClick={() => setLanguageGateOpen(true)}>
          {language === "id" ? "ID · Bahasa Indonesia" : "EN · English"}
        </button>
      </footer>

      <ProjectDialog
        project={selectedProject}
        open={Boolean(selectedProject)}
        onOpenChange={(open) => !open && setSelectedProject(null)}
        language={language}
        labels={t.project}
      />
    </div>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <strong className="block text-2xl font-semibold tracking-[-0.045em]">{value}</strong>
      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">{label}</span>
    </div>
  )
}

function SectionLead({ number, label, title, copyText }) {
  return (
    <div className="grid gap-8 px-5 py-16 md:px-8 md:py-20 lg:grid-cols-[80px_1fr_1fr] lg:px-0 lg:py-0">
      <div className="hidden border-r border-line p-5 pt-10 font-mono text-[10px] text-muted lg:block">
        {number}
      </div>
      <div className="lg:p-10">
        <span className="font-mono text-[10px] uppercase tracking-[.17em] text-muted">{label}</span>
        <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-.055em] md:text-6xl">{title}</h2>
      </div>
      <div className="flex items-end lg:border-l lg:border-line lg:p-10">
        <p className="max-w-lg text-sm leading-7 text-muted">{copyText}</p>
      </div>
    </div>
  )
}

function Principle({ number, title, copyText, border, top }) {
  return (
    <div className={`min-h-56 p-6 md:p-8 ${border ? "sm:border-l sm:border-line" : ""} ${top ? "border-t border-line" : ""}`}>
      <span className="font-mono text-[10px] text-muted">{number}</span>
      <h3 className="mt-12 text-2xl font-semibold tracking-[-.04em]">{title}</h3>
      <p className="mt-3 max-w-sm text-sm leading-7 text-muted">{copyText}</p>
    </div>
  )
}
