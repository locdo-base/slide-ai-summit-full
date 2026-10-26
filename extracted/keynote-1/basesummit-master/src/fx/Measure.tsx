import { motion } from 'motion/react'
import { useCountUp } from './useCountUp'

interface Props {
  label: string
  value: number
  active: boolean
  format?: (n: number) => string
  delay?: number
  sub?: string
}

/** One measured unit — a label and a number that counts up when it becomes real. */
export function Measure({ label, value, active, format = n => Math.round(n).toLocaleString('en-US'), delay = 0, sub }: Props) {
  const n = useCountUp(value, active, { duration: 1.5, delay })
  return (
    <motion.div className="measure" initial={false} animate={{ opacity: active ? 1 : 0.35 }} transition={{ duration: 0.5, delay }}>
      <div className="measure-label">{label}</div>
      <div className="measure-value display num">{active ? format(n) : '–'}</div>
      {sub && <div className="measure-sub">{sub}</div>}
    </motion.div>
  )
}
