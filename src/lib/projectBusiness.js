function toNumber(value, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

export function getProjectUsers(project, liveMetric) {
  const manual = project?.business?.users
  const live = Number(liveMetric?.users)

  // D1 defaults to 0. Do not let an empty live metric erase a manual value.
  if (Number.isFinite(live) && live > 0) return live

  if (manual === null || manual === undefined || manual === "") {
    return null
  }

  const manualNumber = Number(manual)
  return Number.isFinite(manualNumber) ? manualNumber : manual
}

export function getProjectAccesses(project, liveMetric) {
  // `business.accesses` is the manual/start baseline.
  // `liveMetric.accesses` counts new Detail Project opens after analytics is enabled.
  const baseline = toNumber(project?.business?.accesses, 0)
  const live = toNumber(liveMetric?.accesses, 0)
  return Math.max(0, baseline) + Math.max(0, live)
}

export function getProjectPrice(project, language, fallback = "—") {
  const price = project?.business?.price

  if (price === null || price === undefined || price === "") {
    return fallback
  }

  if (typeof price === "string" || typeof price === "number") {
    return String(price)
  }

  return (
    price?.[language] ||
    price?.id ||
    price?.en ||
    fallback
  )
}

export function getProjectLicense(project, language, fallback = "—") {
  const license = project?.business?.license

  if (license === null || license === undefined || license === "") {
    return fallback
  }

  if (typeof license === "string" || typeof license === "number") {
    return String(license)
  }

  return (
    license?.[language] ||
    license?.id ||
    license?.en ||
    fallback
  )
}

export function getProjectPriceValue(project) {
  const explicit = Number(project?.business?.priceValue)
  if (Number.isFinite(explicit)) return explicit

  const raw = getProjectPrice(project, "id", "")
  const digits = String(raw).replace(/[^\d]/g, "")

  return digits ? Number(digits) : Number.POSITIVE_INFINITY
}

export function getProjectTopRank(project) {
  const value = Number(project?.business?.topRank)
  return Number.isFinite(value) && value > 0
    ? Math.floor(value)
    : Number.POSITIVE_INFINITY
}

export function getCurrentRequests(item, liveMetric) {
  return Math.max(0, toNumber(item?.requests, 0)) +
    Math.max(0, toNumber(liveMetric?.requests, 0))
}

export function getCurrentInterested(item, liveMetric) {
  return Math.max(0, toNumber(item?.interestBase, 0)) +
    Math.max(0, toNumber(liveMetric?.interested, 0))
}
