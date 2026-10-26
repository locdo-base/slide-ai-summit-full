import { useEffect, useMemo, useRef, useState } from 'react'
import { MotionConfig } from 'motion/react'
import { keynotes } from '../keynotes'
import { MOCKS, MockFrame, type MockDef } from '../mocks/catalog'
import { Brand } from '../ui/Brand'
import './gallery.css'

/* The resources page at #/resources: every product window in the catalog, grouped by the
   keynote that shows it, each drawn by the same code the stage runs. A card
   opens the window at 1:1 (stage pixels); ← → walk the set, esc closes. */

interface Entry extends MockDef {
  /** W01, A03 … — keynote initial and position within it. */
  tag: string
  slideNo: number
  slideTitle: string
  keynoteTitle: string
}

/** Catalog entries in deck order, tagged. Slides are looked up by id so an
 *  inserted slide never leaves a card pointing at the wrong number. */
function collect(): Entry[] {
  const out: Entry[] = []
  for (const k of keynotes) {
    const mine = MOCKS
      .filter(m => m.keynote === k.id)
      .map(m => ({ m, i: k.slides.findIndex(s => s.id === m.slide) }))
      .sort((a, b) => a.i - b.i)
    mine.forEach(({ m, i }, n) => out.push({
      ...m,
      tag: `${k.title[0].toUpperCase()}${String(n + 1).padStart(2, '0')}`,
      slideNo: i + 1,
      slideTitle: k.slides[i]?.title ?? m.slide,
      keynoteTitle: k.title,
    }))
  }
  return out
}

export function Gallery() {
  const list = useMemo(collect, [])
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => { document.title = 'Resources — AI Summit 2026' }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (open === null) { if (e.key === 'Escape') location.hash = '#/'; return }
      switch (e.key) {
        case 'Escape': setOpen(null); break
        case 'ArrowRight': setOpen(o => Math.min(list.length - 1, (o ?? 0) + 1)); break
        case 'ArrowLeft': setOpen(o => Math.max(0, (o ?? 0) - 1)); break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, list.length])

  const groups = useMemo(() => {
    const g: { title: string; items: Entry[] }[] = []
    for (const e of list) {
      const last = g[g.length - 1]
      if (last?.title === e.keynoteTitle) last.items.push(e)
      else g.push({ title: e.keynoteTitle, items: [e] })
    }
    return g
  }, [list])

  return (
    <MotionConfig reducedMotion="always">
      <div className="gallery">
        <div className="gallery-inner">
          <header className="gallery-head">
            <div>
              <a className="gallery-back" href="#/">← Keynotes</a>
              <h1>Resources</h1>
              <p className="sub">
                {list.length} windows the decks show, drawn at the app's real density by the code the stage runs.
                Click one to see it 1 : 1. They follow the slide config.
              </p>
            </div>
            <Brand />
          </header>

          {groups.map(g => (
            <section key={g.title} className="gallery-group">
              <h2>{g.title}<em>{g.items.length} mocks</em></h2>
              <div className="gallery-grid">
                {g.items.map(e => (
                  <article key={e.id} className="gallery-card" onClick={() => setOpen(list.indexOf(e))}>
                    <header>
                      <span className="tag">{e.tag}</span>
                      <b>{e.name}</b>
                      {e.frame.url && <code>{e.frame.url}</code>}
                    </header>
                    <Thumb entry={e} />
                    <p>{e.note}</p>
                    <footer>
                      <span className="id">{e.id}</span>
                      <a href={`#/${e.keynote}/${e.slideNo}`} onClick={ev => ev.stopPropagation()}>
                        slide {e.slideNo} · {e.slideTitle} →
                      </a>
                    </footer>
                  </article>
                ))}
              </div>
            </section>
          ))}

          <footer className="gallery-foot">
            Add a mock: draw it in <code>src/mocks/</code>, add one entry to <code>src/mocks/catalog.tsx</code>, place it on a slide with <code>&lt;MockWindow id="…" /&gt;</code>.
          </footer>
        </div>

        {open !== null && (
          <Viewer
            entry={list[open]} index={open} total={list.length}
            onClose={() => setOpen(null)}
            onPrev={() => setOpen(Math.max(0, open - 1))}
            onNext={() => setOpen(Math.min(list.length - 1, open + 1))}
          />
        )}
      </div>
    </MotionConfig>
  )
}

/** The window scaled to fit its card: whole, centred, never cropped. */
function Thumb({ entry }: { entry: Entry }) {
  const box = useRef<HTMLDivElement>(null)
  const fit = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0)
  const natural = (entry.frame.width ?? 1540) * entry.frame.zoom

  useEffect(() => {
    const b = box.current, f = fit.current
    if (!b || !f) return
    // offsetHeight is the layout size before the transform; CSS zoom inside the
    // window is a reflow, so it is already counted.
    const measure = () => {
      const k = Math.min(b.clientWidth / natural, b.clientHeight / Math.max(1, f.offsetHeight))
      setScale(Number.isFinite(k) && k > 0 ? k : 0)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(b)
    ro.observe(f)
    return () => ro.disconnect()
  }, [natural])

  return (
    <div className="gallery-thumb" ref={box}>
      <div className="gallery-thumb-fit" ref={fit} style={{ width: natural, transform: `translate(-50%, -50%) scale(${scale})`, opacity: scale ? 1 : 0 }}>
        <MockFrame id={entry.id} />
      </div>
    </div>
  )
}

interface ViewerProps {
  entry: Entry
  index: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

/** One window at stage size, over the gallery. */
function Viewer({ entry, index, total, onClose, onPrev, onNext }: ViewerProps) {
  return (
    <div className="gallery-viewer" onClick={onClose}>
      <div className="gallery-viewer-bar" onClick={e => e.stopPropagation()}>
        <span className="tag">{entry.tag}</span>
        <b>{entry.name}</b>
        <span className="note">{entry.note}</span>
        <span className="spacer" />
        <a href={`#/${entry.keynote}/${entry.slideNo}`}>open slide {entry.slideNo} →</a>
        <span className="num">{index + 1} / {total}</span>
        <button className="ctl ctl-sm" onClick={onPrev} disabled={index === 0} title="Previous (←)" aria-label="Previous">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M10 3 5 8l5 5" /></svg>
        </button>
        <button className="ctl ctl-sm" onClick={onNext} disabled={index === total - 1} title="Next (→)" aria-label="Next">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 3 5 5-5 5" /></svg>
        </button>
        <button className="ctl ctl-sm" onClick={onClose} title="Close (esc)" aria-label="Close">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
        </button>
      </div>
      <div className="gallery-viewer-body">
        <div className="gallery-viewer-frame" onClick={e => e.stopPropagation()}>
          <MockFrame id={entry.id} />
        </div>
        <div className="gallery-viewer-scale">1 : 1 at stage size — 1920 wide</div>
      </div>
    </div>
  )
}
