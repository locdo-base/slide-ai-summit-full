import type { MouseEvent } from 'react'

/** Icons are drawn on a 16 grid so they stay sharp at the 15px the bar uses. */
const icon = (d: string) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    {d.split('|').map((p, i) => <path key={i} d={p} />)}
  </svg>
)

const Prev = icon('M10 3.5 5.5 8 10 12.5')
const Next = icon('M6 3.5 10.5 8 6 12.5')
const List = icon('M2.5 3.5h4.5v9H2.5z|M9 5h4.5|M9 8h4.5|M9 11h3')
const Note = icon('M3.5 2.5h9v11h-9z|M5.75 5.75h4.5|M5.75 8.25h4.5|M5.75 10.75h2.5')
const Full = icon('M6 2.5H2.5V6|M10 2.5h3.5V6|M6 13.5H2.5V10|M10 13.5h3.5V10')
const Screen = icon('M1.5 3h13v8.5h-13z|M6 13.5h4')

/** Hand focus back to the page after a click, so the next space or arrow drives
 *  the deck instead of re-firing the button that was pressed. */
const act = (fn: () => void) => (e: MouseEvent<HTMLButtonElement>) => { e.currentTarget.blur(); fn() }

interface Props {
  index: number
  total: number
  step: number
  maxStep: number
  /** Another keynote precedes / follows this one in the programme, so the
   *  arrows keep working at the deck's ends. */
  hasBefore?: boolean
  hasAfter?: boolean
  onPrev: () => void
  onNext: () => void
  onStep: (step: number) => void
  onReplay: () => void
  onFullscreen: () => void
  rail: boolean
  onRail: () => void
  /** Omitted in the presenter window, which is all notes already. */
  notes?: boolean
  onNotes?: () => void
  /** Solo only: hide every panel. */
  onClean?: () => void
  /** Solo only: open the second-screen display. */
  presenting?: boolean
  onPresent?: () => void
}

/** The bar under the stage: where you are in the deck, how many clicks are left
 *  on this slide, and the panels a presenter toggles. */
export function Controls({
  index, total, step, maxStep, hasBefore, hasAfter, onPrev, onNext, onStep, onReplay, onFullscreen,
  rail, onRail, notes, onNotes, onClean, presenting, onPresent,
}: Props) {
  const left = maxStep - step
  return (
    <div className="controls" onClick={e => e.stopPropagation()}>
      <button className="ctl" onClick={act(onPrev)} disabled={index === 0 && step === 0 && !hasBefore}
        title="Back (←)" aria-label="Back">{Prev}</button>

      <span className="ctl-count" title={`Slide ${index + 1} of ${total}`}>
        <span className="cur">{index + 1}</span><span className="sep">/</span><span className="total">{total}</span>
      </span>

      <button className="ctl" onClick={act(onNext)} disabled={index === total - 1 && step === maxStep && !hasAfter}
        title="Forward (→ or space)" aria-label="Forward">{Next}</button>

      <span className="ctl-div" />

      {/* Builds on this slide — one pip per click, lit up to where you are. */}
      <span
        className="ctl-steps"
        title={maxStep
          ? `Build ${step + 1} of ${maxStep + 1} · ${left ? `${left} click${left > 1 ? 's' : ''} left on this slide` : 'next click opens the next slide'}`
          : 'One state, no builds — the next click opens the next slide'}
      >
        {Array.from({ length: maxStep + 1 }, (_, k) => (
          <button key={k} className="ctl-pip" onClick={act(() => onStep(k))}
            data-state={k === step ? 'now' : k < step ? 'done' : 'todo'}
            aria-label={`Build ${k + 1} of ${maxStep + 1}`} />
        ))}
        {left > 0 && <span className="ctl-left">+{left}</span>}
      </span>

      <span className="ctl-div" />

      <button className="ctl ctl-wide" onClick={act(onReplay)} title="Replay this slide from its first build (R)">
        <span>Replay</span><span className="ctl-kbd">R</span>
      </button>

      <span className="ctl-div" />

      <button className="ctl" data-on={rail} onClick={act(onRail)} title="Slide list (S)" aria-label="Slide list">{List}</button>
      {onNotes && (
        <button className="ctl" data-on={notes} onClick={act(onNotes)} title="Speaker notes (N)" aria-label="Speaker notes">{Note}</button>
      )}
      {onPresent && (
        <button className="ctl" data-on={presenting} onClick={act(onPresent)}
          title="Presenter view on two screens (P)" aria-label="Presenter view">{Screen}</button>
      )}
      <button className="ctl" onClick={act(onFullscreen)} title="Full screen (F)" aria-label="Full screen">{Full}</button>

      {onClean && (
        <button className="ctl ctl-wide" onClick={act(onClean)} title="Clean view — hide every panel (H)">
          <span>Clean</span><span className="ctl-kbd">H</span>
        </button>
      )}
    </div>
  )
}
