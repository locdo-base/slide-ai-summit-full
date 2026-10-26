import { useEffect, useRef } from 'react'
import type { ChapterDef, SlideDef } from './types'
import { SlidePreview } from './SlidePreview'
import { RAIL_MAX, RAIL_MIN } from './chrome'

interface Props {
  slides: SlideDef[]
  chapters: ChapterDef[]
  index: number
  /** Build the deck is on, for the pips on the active thumbnail. */
  step: number
  width: number
  onWidth: (w: number) => void
  onPick: (slide: number) => void
  onClose: () => void
}

export function Rail({ slides, chapters, index, step, width, onWidth, onPick, onClose }: Props) {
  const activeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => { activeRef.current?.scrollIntoView({ block: 'nearest' }) }, [index])

  const drag = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault()
    const el = e.currentTarget
    el.setPointerCapture(e.pointerId)
    const move = (ev: PointerEvent) => onWidth(Math.max(RAIL_MIN, Math.min(RAIL_MAX, Math.round(ev.clientX))))
    const up = () => { el.releasePointerCapture(e.pointerId); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up) }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
  }

  return (
    <div className="rail" style={{ width }}>
      <div className="rail-head">
        <span>{slides.length} slides</span>
        <button className="ctl ctl-sm" onClick={onClose} title="Hide slide list (S)" aria-label="Hide slide list">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
        </button>
      </div>
      <div className="rail-list">
        {slides.map((s, i) => {
          const chapter = s.chapter && s.chapter !== slides[i - 1]?.chapter
            ? chapters.find(c => c.id === s.chapter)?.label
            : undefined
          const steps = s.steps ?? 0
          return (
            <div key={s.id}>
              {chapter && <div className="rail-chapter">{chapter}</div>}
              <button
                ref={i === index ? activeRef : undefined}
                className="rail-item"
                data-on={i === index}
                onClick={e => { e.currentTarget.blur(); onPick(i) }}
                title={`${i + 1}. ${s.title}${steps ? ` · ${steps + 1} builds` : ''}`}
              >
                <span className="rail-num">{i + 1}</span>
                <span className="rail-body">
                  {/* Fluid, not a measured pixel width: the frame then shrinks
                      by whatever the scrollbar takes and its glow stays inside
                      the list's padding. */}
                  <span className="rail-frame">
                    <SlidePreview component={s.component} title={s.title} crumb={s.crumb} step={0} still lazy />
                    {steps > 0 && (
                      <span className="rail-pips">
                        {Array.from({ length: steps + 1 }, (_, k) => (
                          <i key={k} data-on={i === index && k <= step} />
                        ))}
                      </span>
                    )}
                  </span>
                  <span className="rail-title">{s.title}</span>
                </span>
              </button>
            </div>
          )
        })}
      </div>
      <div className="rail-resize" onPointerDown={drag} role="separator" aria-label="Resize slide list" />
    </div>
  )
}
