import { useEffect, useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { expectedFinish, formatDateTime, formatElapsed } from "@/lib/live"

export function CurrentProjectCard({ item, language, labels, metric, onInterest, variant }) {
  const [now, setNow] = useState(() => new Date())
  const [clicked, setClicked] = useState(
    () => localStorage.getItem(`portfolio-interest:${item.id}`) === "1"
  )

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const interested = metric?.interested ?? item.interestBase ?? 0
  const requests = metric?.requests ?? item.requests ?? 0

  const handleInterest = async () => {
    if (clicked) return
    const result = await onInterest(item.id)
    if (result) localStorage.setItem(`portfolio-interest:${item.id}`, "1")
    setClicked(true)
  }

  return (
    <article className={`current-card current-card--${variant}`}>
      <div className="current-copy">
        <p className="ui-kicker">{labels.kicker}</p>
        <h3>{item.name?.[language] || item.name?.id}</h3>
        <p className="current-description">{item.description?.[language] || item.description?.id}</p>
        <div className="current-purpose">
          <span className="ui-kicker">{labels.purpose}</span>
          <p>{item.purpose?.[language] || item.purpose?.id}</p>
        </div>
      </div>

      <div className="current-metrics">
        <Info label={labels.ordered} value={formatDateTime(item.orderedAt, language)} />
        <Info label={labels.elapsed} value={formatElapsed(item.orderedAt, language, now)} />
        <Info label={labels.estimate} value={item.estimatedDays ? `${item.estimatedDays} ${language === "id" ? "hari" : "days"}` : labels.notSet} />
        <Info label={labels.expected} value={expectedFinish(item.orderedAt, item.estimatedDays, language)} />
        <Info label={labels.price} value={item.price?.[language] || item.price?.id || labels.notSet} />
        <Info label={labels.requests} value={String(requests)} />
      </div>

      <div className="current-interest">
        <div>
          <span className="ui-kicker">{labels.interested}</span>
          <strong>{interested}</strong>
        </div>
        <Button variant={clicked ? "outline" : "accent"} onClick={handleInterest} disabled={clicked}>
          <Heart className="h-4 w-4" />
          {clicked ? labels.interestedButton : labels.interestButton}
        </Button>
      </div>
    </article>
  )
}

function Info({ label, value }) {
  return (
    <div className="current-metric">
      <span className="ui-kicker">{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
