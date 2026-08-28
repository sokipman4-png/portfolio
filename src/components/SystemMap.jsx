export function SystemMap() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden border-l border-line bg-[linear-gradient(to_right,hsl(var(--line))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--line))_1px,transparent_1px)] bg-[size:34px_34px]">
      <svg
        viewBox="0 0 520 390"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Diagram hubungan browser, server, agent, dan hardware"
      >
        <g fill="none" stroke="currentColor" className="text-line" strokeWidth="1.3">
          <path d="M82 88 H244 V188 H420" />
          <path d="M244 188 V310" />
          <path d="M420 188 V292" />
          <path d="M82 88 V270 H244" strokeDasharray="5 7" />
        </g>

        <Node x="42" y="58" w="82" label="WEB" sub="React" />
        <Node x="203" y="153" w="92" label="SERVER" sub="Go / Node" />
        <Node x="376" y="153" w="90" label="AGENT" sub="Python" />
        <Node x="196" y="280" w="96" label="DATA" sub="SQLite" />
        <Node x="373" y="262" w="98" label="DEVICE" sub="ESP32" />

        <circle cx="244" cy="188" r="4" className="fill-accent stroke-none" />
        <circle cx="420" cy="188" r="4" className="fill-accent stroke-none" />
      </svg>

      <div className="absolute bottom-5 left-5 border border-line bg-paper/90 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] backdrop-blur">
        browser ↔ server ↔ physical world
      </div>
    </div>
  )
}

function Node({ x, y, w, label, sub }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height="54" rx="4" className="fill-paper stroke-line" />
      <text x={Number(x) + 12} y={Number(y) + 22} className="fill-ink font-mono text-[11px] font-bold">
        {label}
      </text>
      <text x={Number(x) + 12} y={Number(y) + 39} className="fill-muted font-mono text-[9px]">
        {sub}
      </text>
    </g>
  )
}
