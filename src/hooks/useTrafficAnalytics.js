import { useCallback, useEffect, useRef, useState } from "react"

const EMPTY = {
  configured: false,
  current: 0,
  today: 0,
  week: 0,
  month: 0,
  year: 0,
  series: [],
}

function getVisitorId() {
  const key = "portfolio-anonymous-visitor"
  let value = localStorage.getItem(key)

  if (!value) {
    value = crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    localStorage.setItem(key, value)
  }

  return value
}

export function useTrafficAnalytics(config = {}) {
  const [data, setData] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const pageviewSent = useRef(false)

  const refreshSeconds = Math.max(10, Number(config.refreshSeconds || 15))
  const heartbeatSeconds = Math.max(15, Number(config.heartbeatSeconds || 25))

  const refresh = useCallback(async () => {
    if (config.enabled === false) {
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/traffic", {
        headers: { Accept: "application/json" },
        cache: "no-store",
      })

      if (!response.ok) return

      const payload = await response.json()
      setData({
        ...EMPTY,
        ...payload,
        series: Array.isArray(payload.series) ? payload.series : [],
      })
    } catch {
      // Local Vite preview tanpa Pages Functions.
    } finally {
      setLoading(false)
    }
  }, [config.enabled])

  const heartbeat = useCallback(async (event = "heartbeat") => {
    if (config.enabled === false || document.visibilityState === "hidden") return

    try {
      await fetch("/api/traffic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitorId: getVisitorId(),
          event,
        }),
      })
    } catch {
      // Tetap aman saat lokal.
    }
  }, [config.enabled])

  useEffect(() => {
    if (config.enabled === false) {
      setLoading(false)
      return
    }

    const sendInitial = async () => {
      if (!pageviewSent.current) {
        pageviewSent.current = true
        await heartbeat("pageview")
      }
      await refresh()
    }

    sendInitial()

    const heartbeatTimer = window.setInterval(
      () => heartbeat("heartbeat"),
      heartbeatSeconds * 1000
    )

    const refreshTimer = window.setInterval(
      refresh,
      refreshSeconds * 1000
    )

    const onVisible = () => {
      if (document.visibilityState === "visible") {
        heartbeat("heartbeat")
        refresh()
      }
    }

    document.addEventListener("visibilitychange", onVisible)

    return () => {
      window.clearInterval(heartbeatTimer)
      window.clearInterval(refreshTimer)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [
    config.enabled,
    heartbeat,
    refresh,
    heartbeatSeconds,
    refreshSeconds,
  ])

  return {
    ...data,
    loading,
    refresh,
  }
}
