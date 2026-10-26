import { useEffect, useRef } from 'react'
import { parseNotes } from './notes'

interface Props {
  notes?: string
  /** Cues shown highlighted above the lines — `|` separates them. */
  keywords?: string
  maxStep: number
  step: number
  /** Scroll the line in play back into view when the deck moves. */
  watch?: unknown
}

/** Speaker notes, split by build: the line for the build on screen is lit, the
 *  one the next click brings up is outlined, the rest are dimmed. */
export function NoteLines({ notes, keywords, maxStep, step, watch }: Props) {
  const lines = parseNotes(notes === undefined ? undefined : notes, maxStep)
  const nowRef = useRef<HTMLDivElement>(null)
  useEffect(() => { nowRef.current?.scrollIntoView({ block: 'nearest' }) }, [step, watch])

  const cues = (keywords ?? '').split('|').map(k => k.trim()).filter(Boolean)
  const head = cues.length > 0 && (
    <div className="note-keywords">
      {cues.map(k => <b key={k}>{k}</b>)}
    </div>
  )

  if (!lines.length) return <>{head}<p className="notes-empty">No notes for this slide.</p></>

  const state = (s: number) => (s === step ? 'now' : s === step + 1 ? 'next' : s < step ? 'done' : 'todo')
  return (
    <>
      {head}
      {lines.map((l, i) => (
        <div
          key={i}
          className="note-line"
          data-state={state(l.step)}
          ref={l.head && l.step === step ? nowRef : undefined}
        >
          <span className="note-chip">{l.head ? (l.step === 0 ? '·' : l.step) : ''}</span>
          <p>{l.text}</p>
        </div>
      ))}
    </>
  )
}
