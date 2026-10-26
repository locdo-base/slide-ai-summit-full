import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { Keynote } from './types'
import { navigate, type Route } from './route'
import { Stage } from './Stage'
import { StepContext } from './step'
import { DeckContext, SlideContext } from './deckContext'
import { FxDefs } from '../fx/defs'
import { Rail } from './Rail'
import { Controls } from './Controls'
import { NotesPanel } from './NotesPanel'
import { Presenter } from './Presenter'
import { isBare, useChrome } from './chrome'
import { audienceUrl, openAudienceWindow, placeOnSecondScreen, roleFromUrl, writeRoleToUrl, type Role } from './view'
import { useDeckSync } from './sync'
import { useSettings } from '../theme/settings'

/** The pace of `autoplay: true` — seconds on each build step. */
const AUTOPLAY_SECONDS = 4

interface Props {
  keynote: Keynote
  route: Route
  /** The keynotes either side in the programme: past the last slide, Next
   *  runs on into `after`; before the first, Back returns into `before`. */
  before?: Keynote
  after?: Keynote
}

export function Deck({ keynote, route, before, after }: Props) {
  const slides = keynote.slides
  const idx = Math.min(route.slide, slides.length - 1)
  const def = slides[idx]
  const maxStep = def.steps ?? 0
  const step = Math.min(route.step, maxStep)

  const [chrome, setChrome] = useChrome()
  const { progress } = useSettings()[0]
  /** The clean view: stage only, nothing around it. Not remembered — a reload
   *  always comes back with the presenter's panels. */
  const [clean, setClean] = useState(isBare)
  /** Bumped by Replay to remount the slide, which runs its builds again. */
  const [replay, setReplay] = useState(0)
  const [role, setRole] = useState<Role>(() => (isBare() ? 'solo' : roleFromUrl()))
  const [notice, setNotice] = useState<string | null>(null)
  /** The projector window, while this window is the one that opened it. */
  const display = useRef<Window | null>(null)

  const go = useCallback((slide: number, st: number) => {
    navigate({ keynote: keynote.id, slide, step: st })
  }, [keynote.id])

  // ── The two windows follow each other ──────────────────────────────────
  const { peers, send } = useDeckSync(
    role,
    { keynote: keynote.id, slide: idx, step, replay },
    useCallback(s => {
      setReplay(s.replay)
      navigate({ keynote: s.keynote, slide: s.slide, step: s.step })
    }, []),
    useCallback((c: 'close') => { if (c === 'close' && roleFromUrl() === 'audience') window.close() }, []),
  )

  const next = useCallback(() => {
    if (step < maxStep) go(idx, step + 1)
    else if (idx < slides.length - 1) go(idx + 1, 0)
    else if (after) navigate({ keynote: after.id, slide: 0, step: 0 })
  }, [go, idx, step, maxStep, slides.length, after])

  const prev = useCallback(() => {
    if (step > 0) go(idx, step - 1)
    else if (idx > 0) go(idx - 1, slides[idx - 1].steps ?? 0)
    else if (before) {
      const last = before.slides.length - 1
      navigate({ keynote: before.id, slide: last, step: before.slides[last]?.steps ?? 0 })
    }
  }, [go, idx, step, slides, before])

  const replaySlide = useCallback(() => {
    go(idx, 0)
    setReplay(n => n + 1)
  }, [go, idx])

  const fullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen()
    else document.documentElement.requestFullscreen?.()
  }, [])

  // ── Presenting on two screens ──────────────────────────────────────────
  const openDisplay = useCallback(() => {
    const w = openAudienceWindow(location.hash)
    display.current = w
    if (!w) {
      setNotice(`The browser blocked the display window. Allow pop-ups for this site and press P again — or open ${audienceUrl()} in a second window yourself.`)
      return
    }
    setNotice(null)
    setRole('presenter')
    writeRoleToUrl('presenter')
  }, [])

  const moveDisplay = useCallback(() => {
    const w = display.current
    if (!w || w.closed) { setNotice('That window is not this one to move — drag it onto the second screen and press F there.'); return }
    void placeOnSecondScreen(w).then(ok => {
      setNotice(ok ? null : 'Could not place the window: allow "Manage windows on all your displays" for this site, or drag it across and press F.')
    })
  }, [])

  const stopPresenting = useCallback(() => {
    send('close')            // reaches the display even after this window reloaded
    display.current?.close()
    display.current = null
    setNotice(null)
    setRole('solo')
    writeRoleToUrl('solo')
  }, [send])

  const audience = role === 'audience'

  // ── Autoplay: a slide that builds on the clock ─────────────────────────
  // Only the driving window runs the clock; the projector window follows it
  // over the sync channel like any other step. A click still advances early,
  // and the timer simply restarts from the new step. Once the last step has
  // had its hold, the deck moves on to the next slide by itself — and stops
  // at the end of the keynote.
  useEffect(() => {
    const a = def.autoplay
    if (!a || audience) return
    const last = step >= maxStep
    if (last && idx >= slides.length - 1) return
    const secs = Array.isArray(a) ? (a[step] ?? a[a.length - 1] ?? AUTOPLAY_SECONDS) : a === true ? AUTOPLAY_SECONDS : a
    // An infinite hold (`Infinity` as the last entry) runs the steps on the
    // clock but leaves the slide for the presenter's click.
    if (!Number.isFinite(secs)) return
    const t = window.setTimeout(() => (last ? go(idx + 1, 0) : go(idx, step + 1)), Math.max(0, secs) * 1000)
    return () => window.clearTimeout(t)
  }, [def.autoplay, audience, step, maxStep, idx, slides.length, go, replay])

  /** On the projector, the click that brings the window forward (to press F on
   *  it, say) must not also eat a build. */
  const focusedAt = useRef(0)
  useEffect(() => {
    const on = () => { focusedAt.current = Date.now() }
    window.addEventListener('focus', on)
    return () => window.removeEventListener('focus', on)
  }, [])
  const advance = useCallback(() => {
    if (audience && Date.now() - focusedAt.current < 400) return
    next()
  }, [audience, next])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      // A focused control owns space and enter — otherwise clicking a panel
      // button would also advance the deck on the next press.
      const onControl = (e.target as HTMLElement | null)?.closest('button, input, [contenteditable]')
      switch (e.key) {
        case ' ': case 'Enter':
          if (onControl) return
          e.preventDefault(); next(); break
        case 'ArrowRight': case 'PageDown': case 'ArrowDown':
          e.preventDefault(); next(); break
        case 'ArrowLeft': case 'PageUp': case 'Backspace': case 'ArrowUp':
          e.preventDefault(); prev(); break
        case 'Home': go(0, 0); break
        case 'End': go(slides.length - 1, slides[slides.length - 1].steps ?? 0); break
        case 'f': case 'F': fullscreen(); break
        case 'r': case 'R': replaySlide(); break
        // The projector window takes navigation only: its chrome stays off.
        case 's': case 'S': if (!audience) setChrome({ rail: !chrome.rail }); break
        case 'n': case 'N': if (!audience && role !== 'presenter') setChrome({ notes: !chrome.notes }); break
        case 'h': case 'H': if (!audience) setClean(v => !v); break
        case 'p': case 'P': if (role === 'solo') openDisplay(); else if (role === 'presenter') stopPresenting(); break
        case 'Escape': if (!audience) navigate({ keynote: null, slide: 0, step: 0 }); break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go, slides, fullscreen, replaySlide, setChrome, chrome.rail, chrome.notes, audience, role, openDisplay, stopPresenting])

  useEffect(() => {
    const tag = role === 'presenter' ? 'Presenter · ' : ''
    document.title = `${tag}${keynote.title} — ${def.title}`
  }, [keynote.title, def.title, role])

  // Closing the presenter window takes the projector window with it.
  useEffect(() => {
    const onGone = () => display.current?.close()
    window.addEventListener('pagehide', onGone)
    return () => window.removeEventListener('pagehide', onGone)
  }, [])

  const Current = def.component
  const chapters = keynote.chapters ?? []
  /* The first slide of a fresh load appears without the cross-fade; every
     slide after it fades in. Done per slide element rather than with
     AnimatePresence's `initial={false}`, which would also block the timed
     reveals inside the first slide — they should run on a reload too. */
  const fresh = useRef(true)
  useEffect(() => { fresh.current = false }, [])
  const rail = chrome.rail && !clean && !audience
  const notes = chrome.notes && !clean && role === 'solo'
  /** One segment per slide, lit up to the current one. */
  const progressBar = (className: string) => (
    <div className={className}>{slides.map((s, i) => <i key={s.id} className={i <= idx ? 'on' : undefined} />)}</div>
  )

  const stage = (
    <Stage onClick={advance}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${def.id}:${replay}`}
          className="slide"
          initial={fresh.current ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <SlideContext.Provider value={{ title: def.title, crumb: def.crumb, last: idx === slides.length - 1 }}>
            <StepContext.Provider value={step}>
              <Current step={step} />
            </StepContext.Provider>
          </SlideContext.Provider>
        </motion.div>
      </AnimatePresence>
      {/* Shown: along the foot of the slide, in every window. */}
      {progress === 'show' && progressBar('progress')}
    </Stage>
  )

  return (
    <DeckContext.Provider value={{ title: keynote.title, chapters }}>
      <div className="deck" data-role={role}>
        {/* Gradients and filters the figures reference — shared by the stage,
            the rail thumbnails and the presenter's previews. */}
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden><FxDefs /></svg>

        {rail && (
          <Rail
            slides={slides} chapters={chapters} index={idx} step={step}
            width={chrome.railW} onWidth={w => setChrome({ railW: w })}
            onPick={i => go(i, 0)} onClose={() => setChrome({ rail: false })}
          />
        )}

        {role === 'presenter' ? (
          <Presenter
            keynote={keynote} index={idx} step={step} peers={peers}
            onPrev={prev} onNext={next} onStep={s => go(idx, s)} onReplay={replaySlide}
            onFullscreen={fullscreen} rail={chrome.rail} onRail={() => setChrome({ rail: !chrome.rail })}
            onOpenDisplay={openDisplay} onMoveDisplay={moveDisplay} onStop={stopPresenting}
            notice={notice} before={before} after={after}
          />
        ) : (
          <div className="deck-main">
            {/* Hidden: off the slide — a strip across the top of the page while
                building, and none in the clean view or on the projector. */}
            {progress === 'hide' && !clean && !audience && progressBar('progress progress-top')}
            {stage}
            {audience && <FullscreenHint />}
            {!clean && !audience && (
              <Controls
                index={idx} total={slides.length} step={step} maxStep={maxStep}
                hasBefore={!!before} hasAfter={!!after}
                onPrev={prev} onNext={next} onStep={s => go(idx, s)} onReplay={replaySlide}
                rail={chrome.rail} onRail={() => setChrome({ rail: !chrome.rail })}
                notes={chrome.notes} onNotes={() => setChrome({ notes: !chrome.notes })}
                onFullscreen={fullscreen} onClean={() => setClean(true)}
                presenting={false} onPresent={openDisplay}
              />
            )}
            {notice && !audience && <div className="deck-notice" onClick={() => setNotice(null)}>{notice}</div>}
          </div>
        )}

        {notes && (
          <NotesPanel
            slide={def} index={idx} total={slides.length} step={step}
            chapter={chapters.find(c => c.id === def.chapter)?.label}
            next={slides[idx + 1]} after={after?.title}
            onClose={() => setChrome({ notes: false })}
          />
        )}
      </div>
    </DeckContext.Provider>
  )
}

/** The projector window tries to go full screen by itself; browsers only allow
 *  that off a gesture, so when it cannot, one click anywhere does it. */
function FullscreenHint() {
  const [full, setFull] = useState(() => !!document.fullscreenElement)
  useEffect(() => {
    document.documentElement.requestFullscreen?.().catch(() => { /* needs a click */ })
    const on = () => setFull(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', on)
    return () => document.removeEventListener('fullscreenchange', on)
  }, [])
  if (full) return null
  return (
    <button
      className="fs-hint"
      onClick={e => { e.stopPropagation(); document.documentElement.requestFullscreen?.() }}
    >
      Full screen <span className="ctl-kbd">F</span>
    </button>
  )
}
