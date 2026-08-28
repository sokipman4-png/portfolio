export function LanguageSwitch({ language, onChange }) {
  return (
    <div className="inline-flex h-9 items-center rounded-full border border-line p-1 font-mono text-[10px] font-bold tracking-[.08em]">
      {[
        ["id", "ID"],
        ["en", "EN"],
      ].map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`grid h-7 min-w-8 place-items-center rounded-full px-2 transition ${
            language === value ? "bg-ink text-paper" : "text-muted hover:text-ink"
          }`}
          aria-label={`Switch language to ${label}`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}
