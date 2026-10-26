import { createContext, useCallback, useContext, useEffect, useRef, useState, type ComponentType, type MouseEvent, type ReactNode } from 'react'
import { useReducedMotion } from 'motion/react'
import { SkipBack, SkipForward, Pause, Play, RotateCcw } from 'lucide-react'
import { useStep } from '../engine/step'
import { navigate, parseHash } from '../engine/route'

/* An animated demo: a run of scenes that play themselves. Ported from the
   design-system deck's LED player (Keynote 4 · Canvas): each scene has a
   length in seconds, its content animates off the clock `t`, and when the
   clock passes the length the next scene starts — until the last, which
   finishes and holds. The player is a provider, so a slide lays its parts
   out like any screen slide: <SceneWalk /> lists the scenes in the text
   column with a bar filling on the one playing, <SceneCaption /> is its one
   line, <SceneStage /> plays it where the product screen goes, and
   <SceneControls /> is the glass bar that pauses, steps and restarts; Space
   pauses too. Every scene is a build step of the slide, so ← → work as they
   do everywhere, the rail shows a pip per scene, and the projector window
   follows the presenter's window scene for scene. */

export interface Scene {
  id: string
  /** Shown in the control bar — chrome. */
  name: string
  /** The list entry — copy. */
  title: ReactNode
  /** The one line the scene makes, the slide's lead while it plays. */
  caption?: ReactNode
  /** Seconds the scene plays before the next one starts. */
  dur: number
  /** The scene's content, animated off the clock. `t` is seconds since the
   *  scene began; under reduced motion it is already past the end. */
  component: ComponentType<{ t: number }>
}

/** The end of the clock under reduced motion — every scene is on its last frame. */
export const T_END = 999

interface Props {
  scenes: Scene[]
  /** The build step the first scene plays at. */
  firstStep: number
  children: ReactNode
}

interface PlayerState {
  scenes: Scene[]
  i: number
  t: number
  progress: number
  playing: boolean
  ctrl: boolean
  toggle: () => void
  goTo: (k: number) => void
  restart: () => void
}

const Ctx = createContext<PlayerState | null>(null)
function usePlayer() {
  const p = useContext(Ctx)
  if (!p) throw new Error('Scene parts must sit inside <ScenePlayer>')
  return p
}

const CLOCK_FPS = 30

export function ScenePlayer({ scenes, firstStep, children }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const i = Math.min(Math.max(step - firstStep, 0), scenes.length - 1)
  const last = i === scenes.length - 1
  const scene = scenes[i]

  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(!reduce)
  const [ctrl, setCtrl] = useState(true)
  const tRef = useRef(0)
  const playingRef = useRef(!reduce)
  const hideTimer = useRef(0)

  // A new scene starts its clock at zero.
  useEffect(() => { tRef.current = 0; setT(0) }, [i])

  // The clock. Renders at most CLOCK_FPS times a second, so the scene's
  // React tree is not rebuilt on every frame.
  useEffect(() => {
    if (reduce) return
    let raf = 0
    let lastNow = performance.now()
    let shown = -1
    const tick = (now: number) => {
      const dt = Math.min(0.1, (now - lastNow) / 1000)
      lastNow = now
      if (playingRef.current) {
        tRef.current += dt
        if (tRef.current >= scene.dur + 0.7) {
          if (!last) { navigate({ ...parseHash(), step: step + 1 }); return }
          playingRef.current = false
          setPlaying(false)
        }
        const q = Math.floor(tRef.current * CLOCK_FPS)
        if (q !== shown) { shown = q; setT(tRef.current) }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [i, step, last, scene.dur, reduce])

  const setPlay = useCallback((on: boolean) => { playingRef.current = on; setPlaying(on) }, [])
  const showCtrl = useCallback(() => {
    setCtrl(true)
    clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => setCtrl(false), 2500)
  }, [])
  const toggle = useCallback(() => { setPlay(!playingRef.current); showCtrl() }, [setPlay, showCtrl])
  const goTo = useCallback((k: number) => {
    const target = firstStep + Math.min(Math.max(k, 0), scenes.length - 1)
    if (target === step) { tRef.current = 0; setT(0) } else navigate({ ...parseHash(), step: target })
    showCtrl()
  }, [firstStep, scenes.length, step, showCtrl])
  const restart = useCallback(() => { goTo(0); setPlay(!reduce) }, [goTo, setPlay, reduce])

  // Space pauses while a demo is on. Taken in the capture phase, ahead of the
  // deck's own listener, which would otherwise read it as "next".
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.key !== ' ') return
      if ((e.target as HTMLElement | null)?.closest('button, input, [contenteditable]')) return
      e.preventDefault(); e.stopImmediatePropagation(); toggle()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [toggle])

  // The bar shows itself on any mouse movement and fades after a moment.
  useEffect(() => {
    showCtrl()
    window.addEventListener('mousemove', showCtrl)
    return () => { window.removeEventListener('mousemove', showCtrl); clearTimeout(hideTimer.current) }
  }, [showCtrl])

  const progress = reduce ? 1 : Math.min(1, t / scene.dur)
  return (
    <Ctx.Provider value={{ scenes, i, t: reduce ? T_END : t, progress, playing, ctrl, toggle, goTo, restart }}>
      {children}
    </Ctx.Provider>
  )
}

/** The scenes by name in the text column, drawn like a screen slide's walk:
 *  the one playing lit, its bar filling off the clock; the done ones full. */
export function SceneWalk() {
  const { scenes, i, progress } = usePlayer()
  return (
    <ol className="walk scene-walk">
      {scenes.map((s, k) => {
        const state = k < i ? 'done' : k === i ? 'now' : 'next'
        const fill = k < i ? 1 : k === i ? progress : 0
        return (
          <li key={s.id} className={`walk-step ${state}`}>
            <span className="walk-n">{String(k + 1).padStart(2, '0')}</span>
            <span className="walk-name">{s.title}</span>
            <span className="walk-track"><i style={{ width: `${fill * 100}%` }} /></span>
          </li>
        )
      })}
    </ol>
  )
}

/** The playing scene's one line, swapping in as the scene changes. */
export function SceneCaption() {
  const { scenes, i } = usePlayer()
  const s = scenes[i]
  return s.caption ? <span key={s.id} className="swap">{s.caption}</span> : null
}

/** The playing scene itself. */
export function SceneStage() {
  const { scenes, i, t } = usePlayer()
  const Sc = scenes[i].component
  return <Sc t={t} />
}

/** The glass bar: previous, play/pause, next, restart. Clicks on it never
 *  reach the stage, whose click is "next". */
export function SceneControls() {
  const { scenes, i, playing, ctrl, toggle, goTo, restart } = usePlayer()
  const stop = (e: MouseEvent) => e.stopPropagation()
  const last = i === scenes.length - 1
  return (
    <div className={`scene-ctrl${ctrl ? ' on' : ''}`} onClick={stop} onDoubleClick={stop}>
      <button type="button" onClick={() => goTo(i - 1)} disabled={i === 0} aria-label="Previous scene"><SkipBack size={22} /></button>
      <button type="button" className="main" onClick={toggle} aria-label={playing ? 'Pause' : 'Play'}>{playing ? <Pause size={24} /> : <Play size={24} />}</button>
      <button type="button" onClick={() => goTo(i + 1)} disabled={last} aria-label="Next scene"><SkipForward size={22} /></button>
      <button type="button" onClick={restart} aria-label="Restart"><RotateCcw size={20} /></button>
      <span className="lbl">Scene {i + 1}/{scenes.length} · {scenes[i].name}</span>
    </div>
  )
}

/* ── Clock helpers for scene components ─────────────────────────────────── */

/** 0 → 1 over `dur` seconds starting at `from`, eased out. */
export function ramp(t: number, from: number, dur: number) {
  const p = Math.min(1, Math.max(0, (t - from) / dur))
  return 1 - Math.pow(1 - p, 3)
}

/** 0 → 1 over `dur` seconds starting at `from`, linear — a slow clock for
 *  content that stages its own entrance. */
export const clock = (t: number, from: number, dur: number) => Math.min(1, Math.max(0, (t - from) / dur))

/** The first characters typed by `t`, starting at `from`, at `cps` a second. */
export function typed(text: string, t: number, from: number, cps = 26) {
  return text.slice(0, Math.max(0, Math.floor((t - from) * cps)))
}

/** Seconds it takes to type `text` at `cps`. */
export const typeTime = (text: string, cps = 26) => text.length / cps
