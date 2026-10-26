import type { SlideDef } from './types'
import { NoteLines } from './NoteLines'

interface Props {
  slide: SlideDef
  index: number
  total: number
  step: number
  chapter?: string
  next?: SlideDef
  /** The keynote that follows, named when this one runs out of slides. */
  after?: string
  onClose: () => void
}

/** Speaker notes docked beside the stage, for presenting from one screen. */
export function NotesPanel({ slide, index, total, step, chapter, next, after, onClose }: Props) {
  const maxStep = slide.steps ?? 0
  const left = maxStep - step
  return (
    <aside className="notes-panel" onClick={e => e.stopPropagation()}>
      <div className="notes-head">
        <div className="notes-kicker">
          <span>Slide {index + 1} of {total}{chapter ? ` · ${chapter}` : ''}</span>
          <button className="ctl ctl-sm" onClick={onClose} title="Hide notes (N)" aria-label="Hide notes">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </button>
        </div>
        <h2 className="notes-title">{slide.title}</h2>
        {maxStep > 0 && (
          <div className="notes-builds">
            Build {step + 1} of {maxStep + 1}
            <span>{left ? `${left} click${left > 1 ? 's' : ''} left here` : next ? 'next click → new slide' : after ? 'next click → next keynote' : 'last build'}</span>
          </div>
        )}
      </div>

      <div className="notes-body">
        <NoteLines notes={slide.notes} keywords={slide.keywords} maxStep={maxStep} step={step} watch={index} />
      </div>

      <div className="notes-foot">
        {next ? <><span>Next</span> {next.title}</> : after ? <><span>Next keynote</span> {after}</> : <span>Last slide</span>}
      </div>
    </aside>
  )
}
