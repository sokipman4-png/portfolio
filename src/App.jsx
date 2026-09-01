import { useEffect, useMemo, useState } from "react"
import {
  activities,
  copy,
  currentProjects,
  projects,
  site,
  skills,
  youtube,
} from "@/data/site-content"
import { LanguageGate } from "@/components/LanguageGate"
import { DesignSwitcher } from "@/components/DesignSwitcher"
import { ProjectDialog } from "@/components/ProjectDialog"
import {
  TAB_ORDER,
  TabNavigation,
} from "@/components/TabNavigation"
import { HomeView } from "@/components/views/HomeView"
import { FeaturedView } from "@/components/views/FeaturedView"
import { ProjectIndexView } from "@/components/views/ProjectIndexView"
import { CurrentView } from "@/components/views/CurrentView"
import { ActivitiesView } from "@/components/views/ActivitiesView"
import { VideosView } from "@/components/views/VideosView"
import { AboutView } from "@/components/views/AboutView"
import { ContactView } from "@/components/views/ContactView"
import { useProjectMetrics } from "@/hooks/useProjectMetrics"
import { useTrafficAnalytics } from "@/hooks/useTrafficAnalytics"
import {
  getProjectAccesses,
  getProjectPriceValue,
  getProjectTopRank,
  getProjectUsers,
} from "@/lib/projectBusiness"

const HASH_TO_TAB = {
  "": "home",
  home: "home",
  work: "work",
  index: "index",
  current: "current",
  activities: "activities",
  videos: "videos",
  about: "about",
  contact: "contact",
}

function tabFromHash() {
  return (
    HASH_TO_TAB[window.location.hash.replace("#", "")] ||
    "home"
  )
}

export default function App() {
  const savedLanguage = localStorage.getItem("portfolio-language")

  const [language, setLanguageState] = useState(
    savedLanguage || "id"
  )

  const [languageGateOpen, setLanguageGateOpen] = useState(
    !savedLanguage
  )

  const [design, setDesignState] = useState(
    localStorage.getItem("portfolio-design") ||
      site.defaultDesign ||
      "editorial"
  )

  const [theme, setThemeState] = useState(
    localStorage.getItem("portfolio-theme") || "light"
  )

  const [effect, setEffectState] = useState(
    localStorage.getItem("portfolio-transition") || "book"
  )

  const [activeTab, setActiveTab] = useState(tabFromHash)
  const [selectedProject, setSelectedProject] = useState(null)
  const [query, setQuery] = useState("")
  const [sort, setSort] = useState("users-desc")

  const t = copy[language]
  const traffic = useTrafficAnalytics(site.traffic)

  useEffect(() => {
    const onHashChange = () => setActiveTab(tabFromHash())
    window.addEventListener("hashchange", onHashChange)
    return () =>
      window.removeEventListener("hashchange", onHashChange)
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dataset.design = design
    document.documentElement.dataset.theme = theme
    document.documentElement.dataset.transition = effect
  }, [language, design, theme, effect])

  const visibleProjects = useMemo(
    () => projects.filter((project) => project.visible !== false),
    []
  )

  const featuredProjects = useMemo(
    () =>
      visibleProjects
        .filter((project) => project.featured)
        .sort(
          (a, b) =>
            (a.featuredRank || 999) -
            (b.featuredRank || 999)
        ),
    [visibleProjects]
  )

  const metricIds = useMemo(
    () => [
      ...visibleProjects.map((project) => project.id),
      ...currentProjects.map((project) => project.id),
    ],
    [visibleProjects]
  )

  const {
    metrics,
    registerInterest,
    registerAccess,
  } = useProjectMetrics(metricIds)

  const ranking = useMemo(() => {
    const ranked = [...visibleProjects].sort((a, b) => {
      const usersA = getProjectUsers(a, metrics[a.id])
      const usersB = getProjectUsers(b, metrics[b.id])

      const scoreA = usersA === null || usersA === undefined ? -1 : Number(usersA)
      const scoreB = usersB === null || usersB === undefined ? -1 : Number(usersB)

      if (scoreA !== scoreB) return scoreB - scoreA

      const rankA = getProjectTopRank(a)
      const rankB = getProjectTopRank(b)
      if (rankA !== rankB) return rankA - rankB

      return (
        getProjectAccesses(b, metrics[b.id]) -
        getProjectAccesses(a, metrics[a.id])
      )
    })

    return new Map(
      ranked.map((project, index) => [project.id, index + 1])
    )
  }, [visibleProjects, metrics])

  const sortedProjects = useMemo(() => {
    const term = query.trim().toLowerCase()

    const filtered = visibleProjects.filter((project) => {
      if (!term) return true

      return (
        project.title.toLowerCase().includes(term) ||
        project.id.toLowerCase().includes(term) ||
        String(project.category || "")
          .toLowerCase()
          .includes(term)
      )
    })

    const usersOf = (project) => {
      const value = getProjectUsers(project, metrics[project.id])
      return value === null || value === undefined ? -1 : Number(value)
    }

    const accessesOf = (project) =>
      getProjectAccesses(project, metrics[project.id])

    const priceOf = (project) =>
      getProjectPriceValue(project)

    return [...filtered].sort((a, b) => {
      if (sort === "users-desc") {
        return (
          usersOf(b) -
            usersOf(a) ||
          (ranking.get(a.id) || 999) -
            (ranking.get(b.id) || 999)
        )
      }

      if (sort === "users-asc") {
        const aValue = usersOf(a)
        const bValue = usersOf(b)

        if (aValue < 0 && bValue >= 0) return 1
        if (bValue < 0 && aValue >= 0) return -1

        return aValue - bValue
      }

      if (sort === "access-desc") {
        return accessesOf(b) - accessesOf(a)
      }

      if (sort === "price-asc") {
        return priceOf(a) - priceOf(b)
      }

      if (sort === "price-desc") {
        const aPrice = priceOf(a)
        const bPrice = priceOf(b)

        if (
          !Number.isFinite(aPrice) &&
          Number.isFinite(bPrice)
        ) {
          return 1
        }

        if (
          !Number.isFinite(bPrice) &&
          Number.isFinite(aPrice)
        ) {
          return -1
        }

        return bPrice - aPrice
      }

      if (sort === "za") {
        return b.title.localeCompare(a.title, language)
      }

      return a.title.localeCompare(b.title, language)
    })
  }, [
    visibleProjects,
    metrics,
    query,
    sort,
    ranking,
    language,
  ])

  const chooseLanguage = (value) => {
    setLanguageState(value)
    localStorage.setItem("portfolio-language", value)
    setLanguageGateOpen(false)
  }

  const changeLanguage = (value) => {
    setLanguageState(value)
    localStorage.setItem("portfolio-language", value)
  }

  const changeDesign = (value) => {
    setDesignState(value)
    localStorage.setItem("portfolio-design", value)
  }

  const changeTheme = (value) => {
    setThemeState(value)
    localStorage.setItem("portfolio-theme", value)
  }

  const changeEffect = (value) => {
    setEffectState(value)
    localStorage.setItem("portfolio-transition", value)
  }

  const navigate = (tab) => {
    if (!TAB_ORDER.includes(tab)) return

    setActiveTab(tab)

    const hash = tab === "home" ? "#home" : `#${tab}`

    if (window.location.hash !== hash) {
      history.pushState(null, "", hash)
    }
  }

  const openProject = (project) => {
    registerAccess(project.id)
    setSelectedProject(project)
  }

  let view = null

  if (activeTab === "home") {
    view = (
      <HomeView
        site={site}
        t={t}
        onNavigate={navigate}
      />
    )
  } else if (activeTab === "work") {
    view = (
      <FeaturedView
        projects={featuredProjects}
        language={language}
        metrics={metrics}
        onOpenProject={openProject}
      />
    )
  } else if (activeTab === "index") {
    view = (
      <ProjectIndexView
        projects={sortedProjects}
        language={language}
        labels={t.index}
        metrics={metrics}
        query={query}
        setQuery={setQuery}
        sort={sort}
        setSort={setSort}
        ranking={ranking}
        onOpenProject={openProject}
      />
    )
  } else if (activeTab === "current") {
    view = (
      <CurrentView
        items={currentProjects}
        language={language}
        labels={t.current}
        metrics={metrics}
        registerInterest={registerInterest}
      />
    )
  } else if (activeTab === "activities") {
    view = (
      <ActivitiesView
        items={activities}
        language={language}
        labels={t.activities}
      />
    )
  } else if (activeTab === "videos") {
    view = (
      <VideosView
        config={youtube}
        labels={t.videos}
      />
    )
  } else if (activeTab === "about") {
    view = (
      <AboutView
        labels={t.about}
        skills={skills}
        language={language}
        traffic={traffic}
      />
    )
  } else if (activeTab === "contact") {
    view = (
      <ContactView
        site={site}
        labels={t.contact}
      />
    )
  }

  return (
    <>
      <LanguageGate
        open={languageGateOpen}
        content={t.languageGate}
        onChoose={chooseLanguage}
      />

      <div className={`app-shell design-${design}`}>
        <TabNavigation
          site={site}
          nav={t.nav}
          active={activeTab}
          onChange={navigate}
          language={language}
          onLanguageChange={changeLanguage}
          theme={theme}
          onThemeToggle={() =>
            changeTheme(
              theme === "dark" ? "light" : "dark"
            )
          }
        />

        <main className="tab-stage">
          <div
            key={`${activeTab}-${effect}`}
            className={`page-transition page-transition--${effect}`}
          >
            {view}
          </div>
        </main>
      </div>

      <DesignSwitcher
        design={design}
        onChange={changeDesign}
        labels={t.design}
        visible={site.showDesignSwitcher}
        theme={theme}
        onThemeChange={changeTheme}
        effect={effect}
        onEffectChange={changeEffect}
      />

      <ProjectDialog
        project={selectedProject}
        open={Boolean(selectedProject)}
        onOpenChange={(open) =>
          !open && setSelectedProject(null)
        }
        language={language}
        labels={t.project}
        liveMetric={
          selectedProject
            ? metrics[selectedProject.id]
            : null
        }
      />
    </>
  )
}
