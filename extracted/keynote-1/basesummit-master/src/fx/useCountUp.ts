import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/** Tween a number toward `target` when `active`; snaps back to `from` when not. */
export function useCountUp(target: number, active: boolean, { from = 0, duration = 1.4, delay = 0 } = {}) {
  const reduce = useReducedMotion()
  const [value, setValue] = useState(active ? target : from)
  useEffect(() => {
    if (!active) { setValue(from); return }
    if (reduce) { setValue(target); return }
    let raf = 0
    const t0 = performance.now() + delay * 1000
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / (duration * 1000)))
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(from + (target - from) * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, from, duration, delay, reduce])
  return value
}
