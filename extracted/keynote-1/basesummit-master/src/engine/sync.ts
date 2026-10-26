import { useCallback, useEffect, useRef, useState } from 'react'
import type { Role } from './view'

/** The two presenting windows are the same app on the same origin, so they talk
 *  over a BroadcastChannel: no server, no network, no lag worth measuring.
 *  Either window may drive — whichever has the keyboard wins, and the other
 *  follows. */
const CHANNEL = 'aisummit-deck'

export interface DeckState {
  keynote: string
  slide: number
  step: number
  /** Replay counter — bumped to make both windows run the builds again. */
  replay: number
}

/** The only command one window sends the other: stand down. Sent by name
 *  rather than through a window handle, so it still reaches a projector window
 *  this one did not open (after a reload, say). */
export type Command = 'close'

type Msg =
  | { t: 'hello'; from: string; role: Role }
  | { t: 'alive'; from: string; role: Role }
  | { t: 'bye'; from: string; role: Role }
  | { t: 'state'; from: string; role: Role; state: DeckState }
  | { t: 'cmd'; from: string; role: Role; cmd: Command }

export interface Peer { role: Role; at: number }

const selfId = Math.random().toString(36).slice(2)
const key = (s: DeckState) => `${s.keynote}/${s.slide}/${s.step}/${s.replay}`

/** Keeps this window's deck state in step with the other window's.
 *  Returns the peers currently alive, so the presenter can say whether the
 *  projector display is actually there. */
export function useDeckSync(
  role: Role,
  state: DeckState,
  onRemote: (s: DeckState) => void,
  onCommand?: (c: Command) => void,
) {
  const latest = useRef({ role, state, onRemote, onCommand })
  latest.current = { role, state, onRemote, onCommand }

  const chan = useRef<BroadcastChannel | null>(null)
  /** State we have just applied from the other window — not ours to echo. */
  const applied = useRef<string | null>(null)
  const [peers, setPeers] = useState<Peer[]>([])

  useEffect(() => {
    if (role === 'solo' || typeof BroadcastChannel === 'undefined') return
    const seen = new Map<string, Peer>()
    const c = new BroadcastChannel(CHANNEL)
    chan.current = c

    const publish = () => {
      const cutoff = Date.now() - 6000
      for (const [id, p] of seen) if (p.at < cutoff) seen.delete(id)
      setPeers([...seen.values()])
    }
    const post = (m: Msg) => { try { c.postMessage(m) } catch { /* window going away */ } }
    const sendState = () => post({ t: 'state', from: selfId, role: latest.current.role, state: latest.current.state })

    c.onmessage = e => {
      const m = e.data as Msg
      if (!m || m.from === selfId) return
      if (m.t === 'bye') { seen.delete(m.from); publish(); return }
      seen.set(m.from, { role: m.role, at: Date.now() })
      publish()
      if (m.t === 'hello') sendState()
      if (m.t === 'cmd') latest.current.onCommand?.(m.cmd)
      if (m.t === 'state' && key(m.state) !== key(latest.current.state)) {
        applied.current = key(m.state)
        latest.current.onRemote(m.state)
      }
    }

    post({ t: 'hello', from: selfId, role })
    const beat = setInterval(() => { post({ t: 'alive', from: selfId, role: latest.current.role }); publish() }, 2000)
    const bye = () => post({ t: 'bye', from: selfId, role: latest.current.role })
    window.addEventListener('pagehide', bye)

    return () => {
      clearInterval(beat)
      window.removeEventListener('pagehide', bye)
      bye()
      c.close()
      chan.current = null
    }
  }, [role])

  // Our own moves go out; the one we just took from the other window does not.
  const k = key(state)
  useEffect(() => {
    const c = chan.current
    if (!c) return
    if (applied.current === k) { applied.current = null; return }
    try { c.postMessage({ t: 'state', from: selfId, role, state } satisfies Msg) } catch { /* ignore */ }
    // `state` is fully described by `k`; re-sending on object identity would loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k, role])

  const send = useCallback((cmd: Command) => {
    try { chan.current?.postMessage({ t: 'cmd', from: selfId, role: latest.current.role, cmd } satisfies Msg) } catch { /* ignore */ }
  }, [])

  return { peers, send }
}
