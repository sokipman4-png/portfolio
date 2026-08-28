import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatNumber(value) {
  return new Intl.NumberFormat("id-ID").format(value || 0)
}

export function formatCompact(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value || 0)
}

export function formatBytes(bytes) {
  if (!bytes) return "0 B"
  const units = ["B", "KB", "MB", "GB"]
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / 1024 ** index
  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`
}
