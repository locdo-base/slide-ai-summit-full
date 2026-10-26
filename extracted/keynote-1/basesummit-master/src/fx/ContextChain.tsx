import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'

interface Link {
  /** The call, in code. */
  code: string
  /** What comes back. */
  out?: string
  /** What the agent knows now. */
  knows: string
  /** The extra line under the node — for the last one, the tools it may call. */
  more?: string[]
}

const LINKS: Link[] = [
  { code: 'id', knows: 'a deal id — and nothing else' },
  { code: 'getObject(id)', out: '→ { obj, service_id }', knows: 'the object, and which service it lives in' },
  { code: 'getService(service_id)', out: '→ definition, context, prompts, data model', knows: 'what the service is for, and how its object is shaped' },
  { code: 'getRules(service)\ngetTools(service)', out: '→ the operational context', knows: 'what to follow, and what it may do' },
  { code: 'actions', knows: 'now it works — in the service, on the object', more: ['enrich(deal)', 'project(deal)', 'createTask(deal, task)', '…'] },
]

const ease = [0.2, 0.8, 0.2, 1] as const

interface Props {
  firstAt?: number
  /** Set, the chain runs on its own: the next node lights every this many
   *  seconds, holds a beat on the last, and starts over — no click. */
  every?: number
}

const HOLD = 3.5

/** Context discovery, from one id to a working agent: five nodes across the
 *  stage, one lit per click — or on a timer — each with the call it makes and
 *  what it knows afterwards. 1640 wide. */
export function ContextChain({ firstAt = 1, every }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const d = (s: number) => (reduce ? 0 : s)
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (every === undefined || reduce) return
    const last = tick === LINKS.length - 1
    const t = setTimeout(() => setTick(last ? 0 : tick + 1), (last ? HOLD : every) * 1000)
    return () => clearTimeout(t)
  }, [tick, every, reduce])
  // Where the chain has reached: the timer's node, or the click's.
  const pos = every === undefined ? step - firstAt + 1 : reduce ? LINKS.length - 1 : tick
  return (
    <div className="chain">
      {LINKS.map((l, i) => {
        const on = i <= pos
        const current = i === pos
        return (
          <div key={l.code} className="chain-item">
            {i > 0 && (
              <motion.div className="chain-arrow" initial={false} animate={{ opacity: on ? 1 : 0.18 }} transition={{ duration: d(0.4) }}>
                <i /><svg viewBox="0 0 12 20" width={12} height={20}><path d="M 1 1 L 10 10 L 1 19" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.div>
            )}
            <motion.div className={`chain-node${current ? ' now' : ''}${i === LINKS.length - 1 ? ' last' : ''}`} initial={false}
              animate={{ opacity: on ? 1 : 0.22, y: on ? 0 : 10 }} transition={{ duration: d(0.55), ease }}>
              <span className="chain-n">{`0${i}`}</span>
              <code>{l.code}</code>
              {l.out && <code className="out">{l.out}</code>}
              {l.more && <div className="chain-more">{l.more.map(m => <code key={m}>{m}</code>)}</div>}
              <p>{l.knows}</p>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}
