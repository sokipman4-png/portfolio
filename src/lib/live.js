export function formatElapsed(orderedAt, language = "id", now = new Date()) {
  if (!orderedAt) return language === "id" ? "Belum diisi" : "Not set"
  const start = new Date(orderedAt)
  if (Number.isNaN(start.getTime())) return language === "id" ? "Belum diisi" : "Not set"

  const diff = Math.max(0, now.getTime() - start.getTime())
  const totalHours = Math.floor(diff / 3_600_000)
  const days = Math.floor(totalHours / 24)
  const hours = totalHours % 24

  if (days === 0) {
    return language === "id"
      ? `${hours} jam`
      : `${hours} hour${hours === 1 ? "" : "s"}`
  }

  return language === "id"
    ? `${days} hari ${hours} jam`
    : `${days} day${days === 1 ? "" : "s"} ${hours} hour${hours === 1 ? "" : "s"}`
}

export function formatDateTime(value, language = "id") {
  if (!value) return language === "id" ? "Belum diisi" : "Not set"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return language === "id" ? "Belum diisi" : "Not set"

  return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date)
}

export function expectedFinish(orderedAt, estimatedDays, language = "id") {
  if (!orderedAt || !estimatedDays) return language === "id" ? "Belum diisi" : "Not set"
  const date = new Date(orderedAt)
  if (Number.isNaN(date.getTime())) return language === "id" ? "Belum diisi" : "Not set"
  date.setTime(date.getTime() + Number(estimatedDays) * 86_400_000)
  return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US", {
    dateStyle: "medium",
  }).format(date)
}

export function formatDate(value, language = "id") {
  if (!value) return ""
  const date = new Date(`${value}T12:00:00`)
  if (Number.isNaN(date.getTime())) return value
  return new Intl.DateTimeFormat(language === "id" ? "id-ID" : "en-US", {
    dateStyle: "long",
  }).format(date)
}
