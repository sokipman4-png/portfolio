import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { projectNotes } from "@/data/site-content"
import { detectedLanguages, normalizeTechnologies } from "@/lib/portfolio"

export function ProjectDialog({ project, open, onOpenChange, language, labels }) {
  if (!project) return null

  const note = projectNotes[project.name]
  const title = note?.title || project.name
  const description = note?.[language] || labels.noDescription
  const technologies = normalizeTechnologies(project.technologies)
  const languages = detectedLanguages(project.languages)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[760px]">
        <div className="pr-12">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {labels.kicker}
          </p>
          <DialogTitle className="text-4xl font-semibold tracking-[-0.055em] md:text-6xl">
            {title}
          </DialogTitle>
          <DialogDescription className="mt-5 max-w-2xl text-sm leading-7 text-muted md:text-base md:leading-8">
            {description}
          </DialogDescription>
        </div>

        <section className="mt-9 border-t border-line pt-6">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {labels.technologies}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.length ? (
              technologies.map((technology) => <Badge key={technology}>{technology}</Badge>)
            ) : (
              <span className="text-sm text-muted">{labels.noTechnology}</span>
            )}
          </div>
        </section>

        <section className="mt-8 border-t border-line pt-6">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {labels.languages}
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {languages.length ? (
              languages.map((item) => (
                <Badge className="normal-case tracking-normal" key={item}>{item}</Badge>
              ))
            ) : (
              <span className="text-sm text-muted">{labels.noLanguage}</span>
            )}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  )
}
