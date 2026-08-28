export function ProfilePanel({ image, content }) {
  return (
    <aside className="flex flex-col border-t border-line lg:border-l lg:border-t-0">
      <figure className="relative aspect-[4/3] overflow-hidden border-b border-line bg-panel lg:aspect-[5/4]">
        <img
          src={image}
          alt={content.photoAlt}
          width="560"
          height="700"
          decoding="async"
          fetchPriority="high"
          className="h-full w-full object-cover object-center grayscale"
        />
        <figcaption className="absolute bottom-4 left-4 bg-paper/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[.15em] backdrop-blur">
          {content.kicker}
        </figcaption>
      </figure>

      <div className="p-5 md:p-8 lg:p-9">
        <h2 className="text-3xl font-semibold tracking-[-.05em] md:text-4xl">
          {content.title}
        </h2>
        <p className="mt-5 text-sm leading-7 text-muted">{content.body1}</p>
        <p className="mt-4 text-sm leading-7 text-muted">{content.body2}</p>

        <div className="mt-8 border-t border-line pt-5">
          <span className="font-mono text-[9px] uppercase tracking-[.16em] text-muted">
            {content.focusLabel}
          </span>
          <div className="mt-3 divide-y divide-line border-y border-line">
            {content.focus.map((item, index) => (
              <div key={item} className="flex items-center gap-3 py-3 text-sm">
                <span className="font-mono text-[9px] text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  )
}
