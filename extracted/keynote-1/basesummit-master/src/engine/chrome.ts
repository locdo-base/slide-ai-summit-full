import { useCallback, useEffect, useState } from 'react'

/** Presenter chrome the deck remembers between sessions. */
export interface ChromeState {
  /** Left slide rail. */
  rail: boolean
  /** Right speaker-notes panel. */
  notes: boolean
  /** Rail width in px, dragged by its right edge. */
  railW: number
}

const KEY = 'aisummit.chrome'
const DEFAULTS: ChromeState = { rail: true, notes: false, railW: 208 }

export const RAIL_MIN = 148
export const RAIL_MAX = 420

/** `?bare=1` — stage only, no chrome. What the screenshot scripts and a
 *  projector output want. */
export const isBare = () => new URLSearchParams(location.search).has('bare')

export function useChrome() {
  const [state, setState] = useState<ChromeState>(() => {
    if (isBare()) return { ...DEFAULTS, rail: false, notes: false }
    try { return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(KEY) ?? '{}') } } catch { return DEFAULTS }
  })
  useEffect(() => {
    if (isBare()) return
    try { localStorage.setItem(KEY, JSON.stringify(state)) } catch { /* private mode */ }
  }, [state])
  const patch = useCallback((p: Partial<ChromeState>) => setState(s => ({ ...s, ...p })), [])
  return [state, patch] as const
}
