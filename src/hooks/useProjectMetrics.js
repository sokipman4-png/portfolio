import { useCallback, useEffect, useMemo, useState } from "react"

export function useProjectMetrics(projectIds = []) {
  const ids = useMemo(
    () => [...new Set(projectIds.filter(Boolean))].sort(),
    [projectIds.join("|")]
  )
  const [metrics, setMetrics] = useState({})

  const refresh = useCallback(async () => {
    if (!ids.length) return

    try {
      const response = await fetch(
        `/api/stats?projects=${encodeURIComponent(ids.join(","))}`,
        { headers: { Accept: "application/json" } }
      )
      if (!response.ok) return

      const data = await response.json()
      if (data?.metrics) {
        setMetrics((old) => ({ ...old, ...data.metrics }))
      }
    } catch {
      // Local Vite preview: Pages Function tidak tersedia.
    }
  }, [ids.join("|")])

  useEffect(() => {
    refresh()
    const timer = window.setInterval(refresh, 30_000)
    return () => window.clearInterval(timer)
  }, [refresh])

  const registerInterest = useCallback(async (project) => {
    try {
      const response = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "interest", project }),
      })
      if (!response.ok) return null
      const data = await response.json()
      if (data?.metric) {
        setMetrics((old) => ({ ...old, [project]: data.metric }))
        return data.metric
      }
    } catch {
      return null
    }
    return null
  }, [])

  const registerAccess = useCallback(async (project) => {
    const sessionKey = `portfolio-access:${project}`
    if (sessionStorage.getItem(sessionKey) === "1") {
      return metrics[project] || null
    }

    sessionStorage.setItem(sessionKey, "1")

    // Local feedback first.
    setMetrics((old) => ({
      ...old,
      [project]: {
        ...(old[project] || {}),
        accesses: Number(old[project]?.accesses || 0) + 1,
      },
    }))

    try {
      const response = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "access", project }),
      })

      if (!response.ok) return null
      const data = await response.json()

      if (data?.metric) {
        setMetrics((old) => ({ ...old, [project]: data.metric }))
        return data.metric
      }
    } catch {
      return null
    }

    return null
  }, [metrics])

  return { metrics, refresh, registerInterest, registerAccess }
}
