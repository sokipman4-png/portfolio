const KEY = "portfolio-anonymous-visitor"

export function getAnonymousVisitorId() {
  let value = localStorage.getItem(KEY)

  if (!value) {
    value = crypto.randomUUID
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    localStorage.setItem(KEY, value)
  }

  return value
}
