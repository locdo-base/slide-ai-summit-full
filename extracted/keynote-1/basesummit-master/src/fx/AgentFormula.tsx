import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Cpu, KeyRound, RefreshCw, Server, Wrench } from 'lucide-react'
import type { ComponentType } from 'react'
import { useStep } from '../engine/step'

interface Part {
  key: string
  name: string
  /** What the part means inside a business — shown on cue; empty = none. */
  ours: string
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>
  /** The part a person decides: drawn in the human colour. */
  human?: boolean
}

const OWNERSHIP: Part = {
  key: 'ownership', name: 'Ownership',
  ours: 'who owns it: a person, a service, or the system', Icon: KeyRound, human: true,
}

const PARTS: Part[] = [
  { key: 'model', name: 'Model', ours: 'the LLM — from the public AI providers', Icon: Cpu },
  { key: 'harness', name: 'Harness', ours: 'the orchestration intelligence in Base.vn', Icon: RefreshCw },
  { key: 'tools', name: 'Tools & skills', ours: 'the defined list of capacities and rules', Icon: Wrench },
  { key: 'runtime', name: 'Runtime', ours: 'the computing environment it runs in', Icon: Server },
]

const ease = [0.2, 0.8, 0.2, 1] as const

interface Props {
  /** Step at which ownership joins the formula (default 1) and the business
   *  glosses appear under the parts (default 2). */
  ownAt?: number
  glossAt?: number
}

/** The definition as one open equation: Agent = the parts, each an icon and
 *  a word on a line, a plus sign between them, no boxes — the headline has already said what they are.
 *  Jensen Huang's four come first; on cue, Ownership slides in at the front
 *  in the human colour and the row re-lays out; on the next, each part gets
 *  the line that says what it means for a business. 1640 wide. */
export function AgentFormula({ ownAt = 1, glossAt = 2 }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const owned = step >= ownAt
  const glossed = step >= glossAt
  const parts = owned ? [OWNERSHIP, ...PARTS] : PARTS
  const d = (s: number) => (reduce ? 0 : s)

  return (
    <div className={`formula${owned ? ' owned' : ''}`}>
      <motion.div className="formula-eq" layout transition={{ duration: d(0.6), ease }}>
        <b>Agent</b><span>=</span>
      </motion.div>
      <AnimatePresence initial={false}>
        {parts.flatMap((p, i) => [
          i > 0 && (
            <motion.span key={`${p.key}-plus`} className="formula-plus" layout
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: d(0.6), ease, layout: { duration: d(0.6), ease } }}>+</motion.span>
          ),
          <motion.div
            key={p.key}
            className={`formula-term${p.human ? ' human' : ''}`}
            layout
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: d(0.6), ease, layout: { duration: d(0.6), ease } }}
          >
            <div className="formula-part">
              <i><p.Icon size={30} strokeWidth={1.6} /></i>
              <b>{p.name}</b>
              {p.ours && <motion.span className="formula-gloss" initial={false}
                animate={{ opacity: glossed || p.human ? 1 : 0, y: glossed || p.human ? 0 : 8 }}
                transition={{ duration: d(0.5), delay: glossed && !p.human ? d(0.1 + i * 0.08) : 0 }}>
                {p.ours}
              </motion.span>}
            </div>
          </motion.div>,
        ])}
      </AnimatePresence>
    </div>
  )
}

