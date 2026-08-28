import { cn } from "@/lib/utils"

export function Badge({ className, children }) {
  return (
    <span className={cn("ui-badge inline-flex items-center px-2.5 py-1 font-mono text-[10px]", className)}>
      {children}
    </span>
  )
}
