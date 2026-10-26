import { useEffect, useState, type ReactNode } from 'react'
import type { Keynote } from './types'
import { SlidePreview } from './SlidePreview'
import { NoteLines } from './NoteLines'
import { Controls } from './Controls'
import type { Peer } from './sync'

const TIMER_KEY = 'aisummit.timer'
interface Clock { base: number; since: number | null }

/** Time on stage: runs from the moment the presenter display opens, pausable,
 *  and it survives a reload mid-talk. */
function useTalkClock() {
  const [c, setC] = useState<Clock>(() => {
    try {
      const v = JSON.parse(localStorage.getItem(TIMER_KEY) ?? 'null') as Clock | null
      if (v && typeof v.base === 'number') return v
    } catch { /* private mode */ }
    return { base: 0, since: Date.now() }
  })
  const [, tick] = useState(0)
  useEffect(() => {
    try { localStorage.setItem(TIMER_KEY, JSON.stringify(c)) } catch { /* private mode */ }
  }, [c])
  useEffect(() => {
    const id = setInterval(() => tick(n => n + 1), 500)
    return () => clearInterval(id)
  }, [])
  const elapsed = c.base + (c.since ? Date.now() - c.since : 0)
  return {
    elapsed,
    running: c.since !== null,
    toggle: () => setC(v => (v.since ? { base: v.base + (Date.now() - v.since), since: null } : { base: v.base, since: Date.now() })),
    reset: () => setC(v => ({ base: 0, since: v.since ? Date.now() : null })),
  }
}

function hms(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const pad = (n: number) => String(n).padStart(2, '0')
  return (h ? `${h}:` : '') + `${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`
}

interface Props {
  keynote: Keynote
  index: number
  step: number
  peers: Peer[]
  onPrev: () => void
  onNext: () => void
  onStep: (step: number) => void
  onReplay: () => void
  onFullscreen: () => void
  rail: boolean
  onRail: () => void
  /** (Re)open the projector window. */
  onOpenDisplay: () => void
  /** Push the projector window onto the other screen. */
  onMoveDisplay: () => void
  onStop: () => void
  notice?: ReactNode
  /** The keynotes either side in the programme. */
  before?: Keynote
  after?: Keynote
}

/** The presenter display — what only the speaker sees: the slide now on the
 *  projector, the one coming next, the notes for the build in play, and the
 *  clock. The projector window shows the stage and nothing else. */
export function Presenter({
  keynote, index, step, peers, onPrev, onNext, onStep, onReplay, onFullscreen,
  rail, onRail, onOpenDisplay, onMoveDisplay, onStop, notice, before, after,
}: Props) {
  const slides = keynote.slides
  const def = slides[index]
  const next = slides[index + 1]
  /** Past the last slide: the next keynote's opener, drawn under its own name. */
  const upcoming = next ?? after?.slides[0]
  const upcomingDeck = next ? undefined : after && { title: after.title, chapters: after.chapters ?? [] }
  const maxStep = def.steps ?? 0
  const left = maxStep - step
  const chapter = keynote.chapters?.find(c => c.id === def.chapter)?.label
  const clock = useTalkClock()
  const live = peers.some(p => p.role === 'audience')
  const [wall, setWall] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setWall(new Date()), 10000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="pres">
      <header className="pres-top">
        <div className="pres-who">
          <span className="pres-badge">Presenter</span>
          <span className="pres-deck">{keynote.title}</span>
          <span className="pres-link" data-live={live}>
            <i />{live ? 'Display connected' : 'No display'}
          </span>
          {!live && <button className="pres-btn" onClick={onOpenDisplay}>Open display</button>}
          {live && <button className="pres-btn" onClick={onMoveDisplay} title="Move the display window onto the other screen and size it to fit">Move to 2nd screen</button>}
          <button className="pres-btn" onClick={onStop}>Stop presenting</button>
        </div>
        <div className="pres-clock">
          <button className="pres-time" onClick={clock.toggle} data-running={clock.running} title={clock.running ? 'Pause the talk clock' : 'Start the talk clock'}>
            {hms(clock.elapsed)}
          </button>
          <button className="ctl ctl-sm" onClick={clock.reset} title="Reset the talk clock" aria-label="Reset the talk clock">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 8a5 5 0 1 1-1.7-3.75" /><path d="M13.3 1.9v3h-3" />
            </svg>
          </button>
          <span className="pres-wall">{wall.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </header>

      {notice && <div className="pres-notice">{notice}</div>}

      <div className="pres-grid">
        <section className="pres-now">
          <div className="pres-label">
            <span>On screen · slide {index + 1} of {slides.length}{chapter ? ` · ${chapter}` : ''}</span>
            <span>{maxStep ? `Build ${step + 1} of ${maxStep + 1}${left ? ` · ${left} click${left > 1 ? 's' : ''} left` : ` · next click ${next ? 'changes slide' : after ? 'opens the next keynote' : 'is the last'}`}` : 'One state'}</span>
          </div>
          <div className="pres-screen">
            <SlidePreview component={def.component} title={def.title} crumb={def.crumb} last={index === slides.length - 1} step={step} />
          </div>
          <div className="pres-next">
            <div className="pres-next-frame">
              {upcoming && <SlidePreview component={upcoming.component} title={upcoming.title} crumb={upcoming.crumb} deck={upcomingDeck} step={0} still />}
            </div>
            <div className="pres-next-text">
              <span>{!next && after ? 'Next keynote' : 'Next'}</span>
              <b>{next ? next.title : after ? after.title : 'End of the deck'}</b>
              {upcoming?.steps ? <em>{upcoming.steps + 1} builds</em> : null}
            </div>
          </div>
        </section>

        <section className="pres-notes">
          <div className="pres-label"><span>Speaker notes</span><span>{def.title}</span></div>
          <div className="notes-body">
            <NoteLines notes={def.notes} keywords={def.keywords} maxStep={maxStep} step={step} watch={index} />
          </div>
        </section>
      </div>

      <div className="pres-bar">
        <Controls
          index={index} total={slides.length} step={step} maxStep={maxStep} hasBefore={!!before} hasAfter={!!after}
          onPrev={onPrev} onNext={onNext} onStep={onStep} onReplay={onReplay}
          rail={rail} onRail={onRail} onFullscreen={onFullscreen}
        />
      </div>
    </div>
  )
}
