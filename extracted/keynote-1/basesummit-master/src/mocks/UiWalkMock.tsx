import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { RequestsMock } from './PlatformMocks'
import { WorkflowJobsMock } from './WorkflowJobsMock'
import { TasksHomeMock } from './TasksHomeMock'
import { useWalk, type WalkStep } from '../ui/Walk'

/* One interface for every app, as three apps walked one after another —
   Requests, Tasks, Workflows — each the same frame: the top bar, the app's
   sidebar with its services, the page. Every app is a set of services, so
   the layout and navigation never change. Inside a <Walk> the slide drives
   it; alone it runs its own timer. */
type Key = 'request' | 'task' | 'workflow'
export const UI_WALK: (WalkStep & { key: Key })[] = [
  { key: 'request', name: 'Đề xuất', ms: 3600 },
  { key: 'task', name: 'Công việc', ms: 3600 },
  { key: 'workflow', name: 'Workflow', ms: 3600 },
]

const SCREENS: Record<Key, () => React.JSX.Element> = {
  request: RequestsMock, task: () => <TasksHomeMock rail={false} />, workflow: WorkflowJobsMock,
}

export function UiWalkMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % UI_WALK.length), UI_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const key: Key = walk ? UI_WALK[walk.index].key : reduce ? 'request' : UI_WALK[own].key
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
