import {
  BookOpen,
  ChevronUp,
  GripHorizontal,
  Layers3,
  Moon,
  Palette,
  PanelRightOpen,
  Sparkles,
  Sun,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"

const designs = ["editorial", "terminal", "studio"]

const effects = [
  ["book", BookOpen],
  ["fade", Sparkles],
  ["slide", Layers3],
  ["wipe", PanelRightOpen],
]

const IDLE_COLLAPSE_MS = 5500

export function DesignSwitcher({
  design,
  onChange,
  labels,
  visible = true,
  theme,
  onThemeChange,
  effect,
  onEffectChange,
}) {
  const boxRef = useRef(null)
  const dragRef = useRef(null)
  const idleTimerRef = useRef(null)

  const [expanded, setExpanded] = useState(false)

  const [position, setPosition] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("portfolio-design-position") || "null"
      )
      if (
        saved &&
        Number.isFinite(saved.x) &&
        Number.isFinite(saved.y)
      ) {
        return saved
      }
    } catch {}

    return null
  })

  const clearIdleTimer = () => {
    if (idleTimerRef.current) {
      window.clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
  }

  const scheduleCollapse = () => {
    clearIdleTimer()

    if (!expanded || dragRef.current) return

    idleTimerRef.current = window.setTimeout(() => {
      setExpanded(false)
    }, IDLE_COLLAPSE_MS)
  }

  useEffect(() => {
    if (!expanded) {
      clearIdleTimer()
      return
    }

    scheduleCollapse()
    return clearIdleTimer
  }, [expanded, design, theme, effect])

  useEffect(() => {
    const clamp = () => {
      if (!boxRef.current || !position) return

      const rect = boxRef.current.getBoundingClientRect()

      const next = {
        x: Math.max(
          8,
          Math.min(position.x, window.innerWidth - rect.width - 8)
        ),
        y: Math.max(
          8,
          Math.min(position.y, window.innerHeight - rect.height - 8)
        ),
      }

      if (next.x !== position.x || next.y !== position.y) {
        setPosition(next)
        localStorage.setItem(
          "portfolio-design-position",
          JSON.stringify(next)
        )
      }
    }

    window.addEventListener("resize", clamp)
    return () => window.removeEventListener("resize", clamp)
  }, [position])

  useEffect(() => {
    return () => clearIdleTimer()
  }, [])

  if (!visible) return null

  const startDrag = (event) => {
    if (!boxRef.current) return

    clearIdleTimer()

    const rect = boxRef.current.getBoundingClientRect()

    dragRef.current = {
      pointerId: event.pointerId,
      dx: event.clientX - rect.left,
      dy: event.clientY - rect.top,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    }

    event.currentTarget.setPointerCapture(event.pointerId)

    if (!position) {
      setPosition({
        x: rect.left,
        y: rect.top,
      })
    }
  }

  const moveDrag = (event) => {
    if (!dragRef.current || !boxRef.current) return

    const rect = boxRef.current.getBoundingClientRect()

    if (
      Math.abs(event.clientX - dragRef.current.startX) > 3 ||
      Math.abs(event.clientY - dragRef.current.startY) > 3
    ) {
      dragRef.current.moved = true
    }

    setPosition({
      x: Math.max(
        8,
        Math.min(
          event.clientX - dragRef.current.dx,
          window.innerWidth - rect.width - 8
        )
      ),
      y: Math.max(
        8,
        Math.min(
          event.clientY - dragRef.current.dy,
          window.innerHeight - rect.height - 8
        )
      ),
    })
  }

  const stopDrag = (event) => {
    if (!dragRef.current) return

    const moved = dragRef.current.moved

    try {
      event.currentTarget.releasePointerCapture(
        dragRef.current.pointerId
      )
    } catch {}

    dragRef.current = null

    if (position) {
      localStorage.setItem(
        "portfolio-design-position",
        JSON.stringify(position)
      )
    }

    if (!moved) {
      setExpanded((value) => !value)
    } else {
      setExpanded(true)
      scheduleCollapse()
    }
  }

  const resetPosition = () => {
    localStorage.removeItem("portfolio-design-position")
    setPosition(null)
    setExpanded(true)
  }

  const keepOpen = () => {
    if (expanded) scheduleCollapse()
  }

  return (
    <div
      ref={boxRef}
      className={[
        "design-switcher",
        position ? "design-switcher--positioned" : "",
        expanded
          ? "design-switcher--expanded"
          : "design-switcher--collapsed",
      ].join(" ")}
      style={
        position
          ? {
              left: `${position.x}px`,
              top: `${position.y}px`,
            }
          : undefined
      }
      onPointerDown={clearIdleTimer}
      onPointerUp={keepOpen}
      onClick={keepOpen}
    >
      <button
        className="design-drag-handle"
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onDoubleClick={resetPosition}
        aria-label={
          expanded
            ? "Geser atau tutup pemilih tampilan"
            : "Buka atau geser pemilih tampilan"
        }
        title="Klik untuk buka/tutup · geser untuk pindah · double-click untuk reset posisi"
      >
        <GripHorizontal className="h-4 w-4" />
      </button>

      {!expanded ? (
        <button
          className="design-collapsed-button"
          onClick={() => setExpanded(true)}
        >
          <Palette className="h-3.5 w-3.5" />
          <span>{labels.label}</span>
          <ChevronUp className="h-3.5 w-3.5" />
        </button>
      ) : (
        <div className="design-switch-content">
          <div className="design-switch-title">
            <Palette className="h-3.5 w-3.5" />
            <span>{labels.label}</span>

            <button
              className="design-theme-shortcut"
              onClick={() =>
                onThemeChange(
                  theme === "dark" ? "light" : "dark"
                )
              }
              title={
                theme === "dark" ? labels.light : labels.dark
              }
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>
          </div>

          <div className="design-switch-options">
            {designs.map((item, index) => (
              <button
                key={item}
                className={design === item ? "active" : ""}
                onClick={() => onChange(item)}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {labels[item]}
              </button>
            ))}
          </div>

          <div className="design-subsection">
            <span>{labels.theme}</span>

            <div className="compact-choice">
              <button
                className={
                  theme === "light" ? "active" : ""
                }
                onClick={() => onThemeChange("light")}
              >
                <Sun className="h-3.5 w-3.5" />
                {labels.light}
              </button>

              <button
                className={
                  theme === "dark" ? "active" : ""
                }
                onClick={() => onThemeChange("dark")}
              >
                <Moon className="h-3.5 w-3.5" />
                {labels.dark}
              </button>
            </div>
          </div>

          <div className="design-subsection">
            <span>{labels.effect}</span>

            <div className="effect-choice-grid">
              {effects.map(([name, Icon]) => (
                <button
                  key={name}
                  className={
                    effect === name ? "active" : ""
                  }
                  onClick={() => onEffectChange(name)}
                  title={labels[name]}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{labels[name]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
