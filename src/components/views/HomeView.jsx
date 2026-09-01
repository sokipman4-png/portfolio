import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeView({ site, t, onNavigate }) {
  return (
    <section className="view-panel home-view">
      <div className="home-layout">
        <div className="home-hero">
          <div>
            <p className="eyebrow">
              <span className="live-dot" />
              {t.hero.eyebrow}
            </p>

            <h1>
              <span>{t.hero.line1}</span>
              <span className="hero-soft">{t.hero.line2}</span>
              <span>{t.hero.line3}</span>
            </h1>

            <p className="home-description">{t.hero.body}</p>

            <div className="home-actions">
              <Button variant="accent" onClick={() => onNavigate("index")}>
                {t.hero.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => onNavigate("current")}>
                {t.hero.currentCta}
              </Button>
            </div>
          </div>

          <Stats stats={site.stats} labels={t.stats} />
        </div>

        <aside className="home-profile">
          <div className="profile-image-wrap">
            <img
              src={site.profileImage}
              alt={t.bio.photoAlt}
              width="640"
              height="760"
              decoding="async"
            />
          </div>

          <div className="profile-copy">
            <span className="micro-label">{t.bio.kicker}</span>
            <h2>{t.bio.title}</h2>
            <p>{t.bio.body1}</p>
            <p>{t.bio.body2}</p>

            <div className="profile-focus">
              {t.bio.focus.map((item, index) => (
                <span key={item}>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <Marquee items={site.marquee} />
    </section>
  )
}

function Stats({ stats, labels }) {
  const items = [
    [stats.projects, labels.projects],
    [compact(stats.sourceLines), labels.lines],
    [compact(stats.sourceFiles), labels.files],
    [stats.technologies, labels.technologies],
  ]

  return (
    <div className="home-stats">
      {items.map(([value, label]) => (
        <div key={label}>
          <strong>{value}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}

function compact(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

function Marquee({ items }) {
  const group = (
    <div className="marquee-group">
      {items.map((item) => (
        <span key={item}>
          {item}
          <b>✦</b>
        </span>
      ))}
    </div>
  )

  return (
    <div className="home-marquee" aria-label="Skills and technologies">
      <div className="marquee-track">
        {group}
        <div aria-hidden="true" className="marquee-group">
          {items.map((item) => (
            <span key={`copy-${item}`}>
              {item}
              <b>✦</b>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
