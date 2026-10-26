import { motion, useReducedMotion } from 'motion/react'
import type { CSSProperties, ReactNode } from 'react'
import { useStep } from '../engine/step'

interface Props {
  /** Build step at which this becomes visible. */
  at?: number
  /** Optional step at which it hides again. */
  until?: number
  delay?: number
  from?: 'up' | 'down' | 'left' | 'right' | 'none'
  children: ReactNode
  className?: string
  style?: CSSProperties
  /** Keep layout space when hidden (default true). */
  keep?: boolean
}

const offset = (from: Props['from']) => {
  switch (from) {
    case 'up': return { y: 22 }
    case 'down': return { y: -22 }
    case 'left': return { x: 28 }
    case 'right': return { x: -28 }
    default: return {}
  }
}

/** Step-gated entrance. Elements with `at={0}` animate in on mount; later
 *  steps animate in when reached and back out when the step retreats. */
export function Reveal({ at = 0, until, delay = 0, from = 'up', children, className, style, keep = true }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const on = step >= at && (until === undefined || step < until)
  const hidden = { opacity: 0, ...(reduce ? {} : offset(from)) }
  const shown = { opacity: 1, x: 0, y: 0 }
  return (
    <motion.div
      className={className}
      initial={at === 0 ? hidden : false}
      animate={on ? shown : hidden}
      transition={{ duration: reduce ? 0 : 0.7, ease: [0.2, 0.8, 0.2, 1], delay: on ? delay : 0 }}
      style={{ pointerEvents: on ? 'auto' : 'none', ...(keep ? {} : { display: on ? undefined : 'none' }), ...style }}
    >
      {children}
    </motion.div>
  )
}
