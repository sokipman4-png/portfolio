import { useCallback, useEffect, useMemo, useState } from "react"
import { getAnonymousVisitorId } from "@/lib/visitor"

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
        { headers: { Accept: "application/json" }, cache: "no-store" }
      )
      const data = await response.json()
      if (response.ok && data?.metrics) {
        setMetrics((old) => ({ ...old, ...data.metrics }))
      }
    } catch {}
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
        body: JSON.stringify({
          action: "interest",
          project,
          visitorId: getAnonymousVisitorId(),
        }),
      })
      const data = await response.json()
      if (!response.ok || !data?.metric) return null
      setMetrics((old) => ({ ...old, [project]: data.metric }))
      return data.metric
    } catch {
      return null
    }
  }, [])

  const registerAccess = useCallback(async (project) => {
    const sessionKey = `portfolio-access:${project}`
    if (sessionStorage.getItem(sessionKey) === "1") {
      return metrics[project] || null
    }

    try {
      const response = await fetch("/api/stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "access", project }),
      })
      const data = await response.json()
      if (!response.ok || !data?.metric) return null

      sessionStorage.setItem(sessionKey, "1")
      setMetrics((old) => ({ ...old, [project]: data.metric }))
      return data.metric
    } catch {
      return null
    }
  }, [metrics])

  return { metrics, refresh, registerInterest, registerAccess }
}
