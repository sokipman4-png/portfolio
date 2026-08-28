import { useEffect, useState } from "react"
import { Clock3, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { expectedFinish, formatDateTime, formatElapsed } from "@/lib/live"

export function CurrentView({
  items,
  language,
  labels,
  metrics,
  registerInterest,
}) {
  return (
    <section className="view-panel generic-view current-view">
      <div className="generic-view-heading">
        <span className="micro-label">{labels.kicker}</span>
        <h1>{labels.title}</h1>
        <p>{labels.body}</p>
      </div>

      <div className="current-scroll">
        {items.map((item) => (
          <CurrentCard
            key={item.id}
            item={item}
            language={language}
            labels={labels}
            metric={metrics[item.id]}
            registerInterest={registerInterest}
          />
        ))}
      </div>
    </section>
  )
}

function CurrentCard({
  item,
  language,
  labels,
  metric,
  registerInterest,
}) {
  const [now, setNow] = useState(() => new Date())
  const [clicked, setClicked] = useState(
    () => localStorage.getItem(`portfolio-interest:${item.id}`) === "1"
  )

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  const requests = metric?.requests ?? item.requests ?? 0
  const interested = metric?.interested ?? item.interestBase ?? 0

  const handleInterest = async () => {
    if (clicked) return
    const result = await registerInterest(item.id)
    if (result) localStorage.setItem(`portfolio-interest:${item.id}`, "1")
    setClicked(true)
  }

  return (
    <article className="current-project-card">
      <div className="current-project-copy">
        <div>
          <span className="micro-label">{labels.kicker}</span>
          <h2>{item.name?.[language] || item.name?.id}</h2>
          <p>{item.description?.[language] || item.description?.id}</p>
        </div>

        <div className="purpose-block">
          <span className="micro-label">{labels.purpose}</span>
          <p>{item.purpose?.[language] || item.purpose?.id}</p>
        </div>
      </div>

      <div className="current-project-info">
        <Info label={labels.ordered} value={formatDateTime(item.orderedAt, language)} />
        <Info label={labels.elapsed} value={formatElapsed(item.orderedAt, language, now)} />
        <Info
          label={labels.estimate}
          value={
            item.estimatedDays
              ? `${item.estimatedDays} ${language === "id" ? "hari" : "days"}`
              : labels.notSet
          }
        />
        <Info
          label={labels.expected}
          value={expectedFinish(item.orderedAt, item.estimatedDays, language)}
        />
        <Info
          label={labels.price}
          value={item.price?.[language] || item.price?.id || labels.notSet}
        />
        <Info label={labels.requests} value={String(requests)} />

        <div className="current-interest-bar">
          <div>
            <span className="micro-label">{labels.interested}</span>
            <strong>{interested}</strong>
          </div>

          <Button
            variant={clicked ? "outline" : "accent"}
            disabled={clicked}
            onClick={handleInterest}
          >
            <Heart className="h-4 w-4" />
            {clicked ? labels.interestedButton : labels.interestButton}
          </Button>
        </div>
      </div>
    </article>
  )
}

function Info({ label, value }) {
  return (
    <div className="current-info-cell">
      <span className="micro-label">{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
