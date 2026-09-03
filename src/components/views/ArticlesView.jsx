import { BookOpen, CalendarDays, Clock3 } from "lucide-react"
import { formatDate } from "@/lib/live"

export function ArticlesView({
  items,
  language,
  labels,
  onOpenArticle,
}) {
  const visibleItems = items.filter((item) => item.visible !== false)

  return (
    <section className="view-panel generic-view articles-view">
      <div className="generic-view-heading">
        <div>
          <span className="micro-label">{labels.kicker}</span>
          <h1>{labels.title}</h1>
        </div>

        <p>{labels.body}</p>
      </div>

      <div className="articles-scroll">
        {visibleItems.length === 0 ? (
          <div className="articles-empty">
            <BookOpen className="h-6 w-6" />
            <strong>{labels.emptyTitle}</strong>
            <p>{labels.emptyBody}</p>
          </div>
        ) : (
          <div className="articles-grid">
            {visibleItems.map((article) => (
              <button
                type="button"
                className="article-card"
                key={article.id}
                onClick={() => onOpenArticle(article)}
              >
                {article.image ? (
                  <div className="article-cover">
                    <img
                      src={article.image}
                      alt={article.title?.[language] || article.title?.id}
                      width="960"
                      height="540"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div className="article-cover article-cover--empty">
                    <BookOpen className="h-8 w-8" />
                    <span>{article.category?.[language] || article.category?.id || labels.article}</span>
                  </div>
                )}

                <div className="article-card-body">
                  <div className="article-meta">
                    <span>
                      <CalendarDays className="h-3.5 w-3.5" />
                      {formatDate(article.publishedAt, language)}
                    </span>

                    {article.readMinutes ? (
                      <span>
                        <Clock3 className="h-3.5 w-3.5" />
                        {article.readMinutes} {labels.minutes}
                      </span>
                    ) : null}
                  </div>

                  <span className="article-category">
                    {article.category?.[language] || article.category?.id || labels.article}
                  </span>

                  <h2>{article.title?.[language] || article.title?.id}</h2>

                  <p>
                    {article.excerpt?.[language] || article.excerpt?.id}
                  </p>

                  <span className="article-read-link">
                    {labels.read}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
