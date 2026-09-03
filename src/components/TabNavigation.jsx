import { Home, Moon, Sun } from "lucide-react"

export const TAB_ORDER = [
  "home",
  "work",
  "index",
  "current",
  "articles",
  "activities",
  "videos",
  "about",
  "contact",
]

export function TabNavigation({
  site,
  nav,
  active,
  onChange,
  language,
  onLanguageChange,
  theme,
  onThemeToggle,
}) {
  return (
    <header className="top-nav">
      <div className="top-nav-side top-nav-side--left">
        <button className="brand-button" onClick={() => onChange("home")}>
          <span className="brand-symbol">SR</span>
          <span className="brand-name">{site.brand}</span>
        </button>
      </div>

      <nav className="bubble-nav" aria-label="Portfolio sections">
        {TAB_ORDER.map((id) => (
          <button
            key={id}
            className={`bubble-tab ${active === id ? "active" : ""}`}
            onClick={() => onChange(id)}
            aria-current={active === id ? "page" : undefined}
          >
            {id === "home" && (
              <Home className="tab-home-icon h-3.5 w-3.5" />
            )}
            <span>{nav[id]}</span>
          </button>
        ))}
      </nav>

      <div className="top-nav-side top-nav-side--right">
        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label={theme === "dark" ? "Mode terang" : "Mode gelap"}
          title={theme === "dark" ? "Mode terang" : "Mode gelap"}
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        <div className="language-pill">
          <button
            className={language === "id" ? "active" : ""}
            onClick={() => onLanguageChange("id")}
          >
            ID
          </button>
          <button
            className={language === "en" ? "active" : ""}
            onClick={() => onLanguageChange("en")}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  )
}
