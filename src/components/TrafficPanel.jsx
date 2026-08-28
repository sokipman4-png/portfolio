import { Activity, CalendarDays, Radio, TrendingUp } from "lucide-react"

export function TrafficPanel({ data, labels }) {
  const cards = [
    [labels.trafficToday, data.today, <CalendarDays />],
    [labels.trafficWeek, data.week, <TrendingUp />],
    [labels.trafficMonth, data.month, <TrendingUp />],
    [labels.trafficYear, data.year, <CalendarDays />],
    [labels.trafficNow, data.current, <Radio />],
  ]

  return (
    <div className="traffic-panel">
      <div className="traffic-intro">
        <div>
          <span className="micro-label">{labels.trafficTitle}</span>
          <h3>{labels.trafficTitle}</h3>
        </div>
        <p>{labels.trafficBody}</p>
      </div>

      {!data.configured ? (
        <div className="traffic-empty">
          <Activity className="h-5 w-5" />
          <p>{labels.trafficNotReady}</p>
        </div>
      ) : (
        <>
          <div className="traffic-kpis">
            {cards.map(([label, value, icon]) => (
              <div className="traffic-kpi" key={label}>
                <div className="traffic-kpi-icon">{icon}</div>
                <span>{label}</span>
                <strong>{format(value)}</strong>
              </div>
            ))}
          </div>

          <div className="traffic-chart-card">
            <div className="traffic-chart-head">
              <span className="micro-label">{labels.trafficChart}</span>
              <span className="traffic-live">
                <i />
                LIVE
              </span>
            </div>

            <TrafficChart series={data.series || []} />
          </div>
        </>
      )}

      <p className="traffic-privacy">{labels.trafficPrivacy}</p>
    </div>
  )
}

function format(value) {
  return new Intl.NumberFormat("id-ID").format(Number(value || 0))
}

function TrafficChart({ series }) {
  const width = 720
  const height = 230
  const padding = {
    left: 22,
    right: 10,
    top: 18,
    bottom: 28,
  }

  const values = series.map((item) => Number(item.visitors || 0))
  const max = Math.max(1, ...values)
  const innerWidth = width - padding.left - padding.right
  const innerHeight = height - padding.top - padding.bottom

  if (!series.length) {
    return <div className="traffic-chart-placeholder" />
  }

  const points = series.map((item, index) => {
    const x =
      padding.left +
      (series.length === 1
        ? innerWidth / 2
        : (index / (series.length - 1)) * innerWidth)

    const y =
      padding.top +
      innerHeight -
      (Number(item.visitors || 0) / max) * innerHeight

    return {
      x,
      y,
      value: Number(item.visitors || 0),
      day: item.day,
    }
  })

  const line = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ")

  const area = [
    `M ${points[0].x} ${padding.top + innerHeight}`,
    ...points.map((point) => `L ${point.x} ${point.y}`),
    `L ${points[points.length - 1].x} ${padding.top + innerHeight}`,
    "Z",
  ].join(" ")

  const labelIndexes = [0, 7, 14, 21, 29].filter(
    (index) => index < series.length
  )

  return (
    <div className="traffic-chart-wrap">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Grafik pengunjung unik 30 hari"
      >
        <defs>
          <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity=".33" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity=".02" />
          </linearGradient>
        </defs>

        {[0, .25, .5, .75, 1].map((ratio) => {
          const y = padding.top + innerHeight * ratio
          return (
            <line
              key={ratio}
              x1={padding.left}
              x2={width - padding.right}
              y1={y}
              y2={y}
              className="traffic-grid-line"
            />
          )
        })}

        <path d={area} fill="url(#trafficFill)" />
        <path d={line} className="traffic-line" />

        {points.map((point, index) => (
          <g key={`${point.day}-${index}`}>
            <circle
              cx={point.x}
              cy={point.y}
              r="3"
              className="traffic-dot"
            >
              <title>{`${point.day}: ${point.value}`}</title>
            </circle>
          </g>
        ))}

        {labelIndexes.map((index) => {
          const point = points[index]
          return (
            <text
              key={`label-${point.day}`}
              x={point.x}
              y={height - 8}
              textAnchor={
                index === 0
                  ? "start"
                  : index === series.length - 1
                  ? "end"
                  : "middle"
              }
              className="traffic-axis-label"
            >
              {point.day.slice(5)}
            </text>
          )
        })}
      </svg>
    </div>
  )
}
