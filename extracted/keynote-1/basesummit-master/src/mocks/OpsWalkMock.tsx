import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { RequestsMock, SalesPipelineMock } from './PlatformMocks'
import { DealDetailMock } from './DealDetailMock'
import { useWalk, type WalkStep } from '../ui/Walk'

/* How much a service can do, as three screens walked on a timer: a simple
   service operation (the Requests list — one approval after another), a
   complex one (the Sales Pipeline board — stages, forecasts, deals), and one
   with complex work orchestration inside (a deal opened — custom fields,
   collaborations, smart ops, agent flows). Inside a <Walk> the slide drives
   it; alone it runs its own timer. */
type Key = 'simple' | 'complex' | 'orchestration'
export const OPS_WALK: (WalkStep & { key: Key })[] = [
  { key: 'simple', name: 'Service vận hành đơn giản', ms: 3800 },
  { key: 'complex', name: 'Service vận hành phức tạp', ms: 3800 },
  { key: 'orchestration', name: 'Với điều phối công việc phức tạp', ms: 4200 },
]

const SCREENS: Record<Key, () => React.JSX.Element> = {
  simple: RequestsMock, complex: SalesPipelineMock, orchestration: DealDetailMock,
}

export function OpsWalkMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % OPS_WALK.length), OPS_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const key: Key = walk ? OPS_WALK[walk.index].key : reduce ? 'complex' : OPS_WALK[own].key
  const Screen = SCREENS[key]

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={key}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
          <Screen />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
