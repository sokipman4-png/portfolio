import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LanguageGate({ open, content, onChoose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-ink/35 p-4 backdrop-blur-md">
      <div className="w-full max-w-xl overflow-hidden rounded-[30px] border border-line bg-paper shadow-2xl">
        <div className="border-b border-line p-6 md:p-8">
          <div className="mb-9 flex items-center justify-between">
            <span className="grid h-9 w-9 place-items-center bg-ink font-mono text-[10px] font-bold text-paper">
              SR
            </span>
            <Languages className="h-5 w-5 text-muted" />
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[.18em] text-muted">
            {content.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-.055em] md:text-6xl">
            {content.title}
          </h2>
          <p className="mt-5 max-w-lg text-sm leading-7 text-muted">
            {content.body}
          </p>
        </div>

        <div className="grid gap-3 p-4 sm:grid-cols-2 md:p-6">
          <Button className="h-14 rounded-2xl" onClick={() => onChoose("id")}>
            ID · {content.id}
          </Button>
          <Button variant="outline" className="h-14 rounded-2xl" onClick={() => onChoose("en")}>
            EN · {content.en}
          </Button>
        </div>
      </div>
    </div>
  )
}
