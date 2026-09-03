import { CalendarDays, Clock3 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { formatDate } from "@/lib/live"

export function ArticleDialog({
  article,
  open,
  onOpenChange,
  language,
  labels,
}) {
  if (!article) return null

  const title = article.title?.[language] || article.title?.id
  const excerpt = article.excerpt?.[language] || article.excerpt?.id
  const paragraphs =
    article.content?.[language] ||
    article.content?.id ||
    []

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="article-dialog">
        <article>
          <header className="article-dialog-head">
            <span className="micro-label">
              {article.category?.[language] ||
                article.category?.id ||
                labels.article}
            </span>

            <DialogTitle className="article-dialog-title">
              {title}
            </DialogTitle>

            <DialogDescription className="article-dialog-excerpt">
              {excerpt}
            </DialogDescription>

            <div className="article-dialog-meta">
              <span>
                <CalendarDays className="h-4 w-4" />
                {formatDate(article.publishedAt, language)}
              </span>

              {article.readMinutes ? (
                <span>
                  <Clock3 className="h-4 w-4" />
                  {article.readMinutes} {labels.minutes}
                </span>
              ) : null}
            </div>
          </header>

          {article.image ? (
            <div className="article-dialog-cover">
              <img
                src={article.image}
                alt={title}
                width="1280"
                height="720"
                decoding="async"
              />
            </div>
          ) : null}

          <div className="article-dialog-content">
            {paragraphs.map((paragraph, index) => (
              <p key={`${article.id}-${index}`}>
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </DialogContent>
    </Dialog>
  )
}
