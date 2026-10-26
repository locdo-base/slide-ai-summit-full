import { motion, useReducedMotion } from 'motion/react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Callout } from '../../../mocks/Window'
import { MockWindow } from '../../../mocks/catalog'
import { useStep } from '../../../engine/step'
import { CONTEXT_WALK, CALLS, CallStack } from '../../../mocks/ContextWalkMock'

/** The five steps as the chain's boxes, stacked in the text column: the call,
 *  what comes back, and — on the current one — what the agent knows now. */
function ContextSteps({ at }: { at: number }) {
  const reduce = useReducedMotion()
  const d = (s: number) => (reduce ? 0 : s)
  return (
    <div className="chain stack">
      {CONTEXT_WALK.map((l, i) => {
        const on = i <= at, now = i === at
        return (
          <motion.div key={l.key} className={`chain-node${now ? ' now' : ''}`} initial={false}
            animate={{ opacity: on ? 1 : 0.38 }} transition={{ duration: d(0.45) }}>
            <span className="chain-n">{`0${i + 1}`}</span>
            <code>{l.code}</code>
            {l.out && <code className="out">{l.out}</code>}
            {now && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d(0.2), duration: d(0.4) }}>{l.knows}</motion.p>}
          </motion.div>
        )
      })}
    </div>
  )
}

/* Context discovery in a service: the deal page with its copilot, walked five
   clicks — one id, the object, the service, its rules and tools, then the
   agent acting on the deal. The steps stand as boxes in the text column; each
   click rings the part of the page the call reads, with a popover that runs
   the call and prints the JSON that came back. No lead — the window takes
   the room. */
export function ContextDiscoverySlide() {
  const step = useStep()
  const i = Math.min(step, CONTEXT_WALK.length - 1)
  const s = CONTEXT_WALK[i]
  return (
    <SlideFrame
      chapter="operation"
      headline="Context discovery trong một service."
      cues={['05 bước', 'áp dụng cho tất cả các service']}
      aside={<ContextSteps at={i} />}
      figureClass="bleed discovery"
    >
      <MockWindow id="context-walk" x={0} y={0} />
      <Callout key={s.key} target={s.target} at={0} side={s.side} boxed label={<CallStack calls={CALLS[i]} />} />
    </SlideFrame>
  )
}
