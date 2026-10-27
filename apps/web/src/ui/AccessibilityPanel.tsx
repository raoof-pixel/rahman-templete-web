'use client'
/* Site-wide accessibility panel (floating button, bottom left): text size, contrast, readable font,
   line spacing, link highlighting, reading guide, pause animations, large cursor.
   Ported from the design template's article-tools.js. Choices are saved per browser.
   Styles: ui/article-tools.css (classes on <html>: a11y-size-1…3, a11y-contrast, …). */
import { useEffect, useRef, useState } from 'react'

type Prefs = { size: number; contrast: boolean; font: boolean; space: boolean; links: boolean; guide: boolean; motion: boolean; cursor: boolean }
type Toggle = Exclude<keyof Prefs, 'size'>

const DEFAULTS: Prefs = { size: 0, contrast: false, font: false, space: false, links: false, guide: false, motion: false, cursor: false }
const TOGGLES: [Toggle, string][] = [
  ['contrast', 'High contrast'],
  ['font', 'Readable font'],
  ['space', 'Line spacing'],
  ['links', 'Highlight links'],
  ['guide', 'Reading guide'],
  ['motion', 'Pause animations'],
  ['cursor', 'Large cursor'],
]
const SIZES = [
  ['A', 'Default text size'],
  ['A+', 'Larger text'],
  ['A++', 'Extra large text'],
  ['A+++', 'Largest text'],
] as const
const KEY = 'csme-a11y'

function load(): Prefs {
  try {
    return { ...DEFAULTS, ...(JSON.parse(localStorage.getItem(KEY) || '{}') as Partial<Prefs>) }
  } catch {
    return DEFAULTS
  }
}

function apply(p: Prefs) {
  const c = document.documentElement.classList
  ;[1, 2, 3].forEach((n) => c.toggle('a11y-size-' + n, p.size === n))
  TOGGLES.forEach(([k]) => c.toggle('a11y-' + k, p[k]))
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    /* private mode */
  }
}

export default function AccessibilityPanel() {
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS)
  const [open, setOpen] = useState(false)
  const [guideTop, setGuideTop] = useState(-100)
  const fabRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const firstRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const p = load()
    setPrefs(p)
    apply(p)
  }, [])

  const update = (p: Prefs) => {
    setPrefs(p)
    apply(p)
  }

  const show = (o: boolean) => {
    setOpen(o)
    if (o) setTimeout(() => firstRef.current?.focus(), 0)
    else fabRef.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') show(false)
    }
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node
      if (!panelRef.current?.contains(t) && !fabRef.current?.contains(t)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('click', onClick)
    }
  }, [open])

  useEffect(() => {
    if (!prefs.guide) return
    const onMove = (e: MouseEvent) => setGuideTop(e.clientY - 22)
    document.addEventListener('mousemove', onMove, { passive: true })
    return () => document.removeEventListener('mousemove', onMove)
  }, [prefs.guide])

  return (
    <>
      <div className="csme-guide" aria-hidden="true" style={{ top: guideTop + 'px' }} />
      <div className="csme-a11y-panel" id="csme-a11y-panel" role="dialog" aria-modal="false" aria-labelledby="csme-a11y-title" hidden={!open} ref={panelRef}>
        <div className="csme-a11y-h">
          <h2 id="csme-a11y-title">Accessibility</h2>
          <button type="button" className="csme-a11y-x" aria-label="Close accessibility options" onClick={() => show(false)}>
            ×
          </button>
        </div>
        <div className="csme-a11y-b">
          <div className="csme-a11y-row">
            <span>Text size</span>
            <div className="csme-a11y-seg" role="group" aria-label="Text size">
              {SIZES.map(([label, aria], n) => (
                <button key={label} ref={n === prefs.size ? firstRef : undefined} type="button" aria-pressed={prefs.size === n} aria-label={aria} onClick={() => update({ ...prefs, size: n })}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="csme-a11y-grid">
            {TOGGLES.map(([k, label]) => (
              <button key={k} type="button" className="csme-a11y-tg" aria-pressed={prefs[k]} onClick={() => update({ ...prefs, [k]: !prefs[k] })}>
                {label}
              </button>
            ))}
          </div>
          <button type="button" className="csme-a11y-reset" onClick={() => update(DEFAULTS)}>
            Reset all settings
          </button>
          <p className="csme-a11y-note">Your choices are saved on this device. Articles also have a Listen button that reads the full story aloud.</p>
        </div>
      </div>
      <button type="button" ref={fabRef} className="csme-a11y-fab" aria-label="Accessibility options" aria-expanded={open} aria-controls="csme-a11y-panel" onClick={() => show(!open)}>
        <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
          <circle cx="12" cy="4.5" r="2" fill="currentColor" />
          <path fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 8.5l7 1.5 7-1.5M12 10v4.5M12 14.5L8.5 21M12 14.5l3.5 6.5" />
        </svg>
      </button>
    </>
  )
}
