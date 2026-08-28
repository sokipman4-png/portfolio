export function LanguageGate({ open, content, onChoose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-[#0d0f13]/85 p-4 backdrop-blur-lg">
      <div className="w-full max-w-xl rounded-[28px] border border-white/15 bg-[#f1eee6] p-6 text-[#111318] shadow-2xl md:p-9">
        <span className="font-mono text-[10px] uppercase tracking-[.18em] text-black/50">
          {content.kicker}
        </span>
        <h2 className="mt-3 text-4xl font-semibold tracking-[-.055em] md:text-6xl">{content.title}</h2>
        <p className="mt-4 max-w-lg text-sm leading-7 text-black/55">{content.body}</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            className="group border border-black/15 p-5 text-left transition hover:bg-black hover:text-white"
            onClick={() => onChoose("id")}
          >
            <span className="font-mono text-[10px] opacity-55">ID</span>
            <strong className="mt-8 block text-lg">{content.id}</strong>
          </button>
          <button
            className="group border border-black/15 p-5 text-left transition hover:bg-black hover:text-white"
            onClick={() => onChoose("en")}
          >
            <span className="font-mono text-[10px] opacity-55">EN</span>
            <strong className="mt-8 block text-lg">{content.en}</strong>
          </button>
        </div>
      </div>
    </div>
  )
}
