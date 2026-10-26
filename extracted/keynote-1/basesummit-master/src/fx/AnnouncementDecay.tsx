import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'

interface Props { width?: number; height?: number; personAt?: number }

/** An announcement at day zero, and the attention curve that follows it. */
export function AnnouncementDecay({ width = 880, height = 640, personAt = 1 }: Props) {  const step = useStep()
  const reduce = useReducedMotion()
  const x0 = 70, x1 = width - 60
  const base = height - 130
  const topY = 130
  // attention(t) = e^(-t/τ), sampled across the axis
  const N = 60
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const u = i / N
    const x = x0 + (x1 - x0) * u
    const y = base - (base - topY) * Math.exp(-u * 7)
    return [x, y]
  })
  const d = pts.map(([x, y], i) => `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
  const ticks = [
    { u: 0, label: 'Ngày 0' },
    { u: 0.22, label: 'Tuần 1' },
    { u: 0.44, label: 'Tuần 2' },
    { u: 0.86, label: 'Tuần 6' },
  ]
  const personX = x0 + (x1 - x0) * 0.86
  const personOn = step >= personAt
  const ease = [0.2, 0.8, 0.2, 1] as const

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <line x1={x0} x2={x1} y1={base} y2={base} stroke="var(--line-strong)" />
      <line x1={x0} x2={x0} y1={base} y2={topY - 40} stroke="var(--line)" />
      {ticks.map(tick => {
        const x = x0 + (x1 - x0) * tick.u
        return (
          <g key={tick.u}>
            <line x1={x} x2={x} y1={base} y2={base + 10} stroke="var(--line-strong)" />
            <text x={x} y={base + 42} textAnchor="middle" fontSize={20} className="dim">{tick.label}</text>
          </g>
        )
      })}
      <text x={x0 + 14} y={topY - 54} fontSize={19} className="dim">{'mức chú ý'}</text>

      {/* the announcement: a ring that keeps pinging at day zero */}
      <g>
        {!reduce && [0, 1].map(i => (
          <circle key={i} cx={x0} cy={topY} r={10} fill="none" stroke="var(--blue-300)" strokeWidth={1.4} opacity={0}>
            <animate attributeName="r" values="10;54" dur="2.8s" begin={`${i * 1.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" dur="2.8s" begin={`${i * 1.4}s`} repeatCount="indefinite" />
          </circle>
        ))}
        <circle cx={x0} cy={topY} r={10} fill="var(--blue-300)" />
        <motion.text x={x0 + 70} y={topY + 8} fontSize={24} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          {'Chính sách được công bố'}
        </motion.text>
      </g>

      <motion.path
        d={d} fill="none" stroke="var(--blue-300)" strokeWidth={3} strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 2.6, delay: 0.5, ease: 'easeInOut' }}
      />
      <motion.text x={x0 + (x1 - x0) * 0.5} y={base - 26} fontSize={24} className="muted" textAnchor="middle"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : 2.6 }}>
        bị lãng quên
      </motion.text>

      {/* a newcomer arrives long after the curve went flat — on the click, or,
          with no click (personAt 0), on its own once the curve has drawn */}
      <motion.g initial={personAt === 0 ? { opacity: 0, y: 16 } : false}
        animate={{ opacity: personOn ? 1 : 0, y: personOn ? 0 : 16 }}
        transition={{ duration: 0.7, ease, delay: personAt === 0 && !reduce ? 3.2 : 0 }}>
        <line x1={personX} x2={personX} y1={base - 8} y2={base - 150} stroke="var(--amber-300)" strokeDasharray="4 7" />
        <circle cx={personX} cy={base - 178} r={11} fill="none" stroke="var(--amber-300)" strokeWidth={2} />
        <path d={`M ${personX - 20} ${base - 140} q 20 -26 40 0`} fill="none" stroke="var(--amber-300)" strokeWidth={2} />
        <text x={personX} y={base - 216} textAnchor="middle" fontSize={24} className="tone-human">{'Nhân viên mới gia nhập'}</text>
        <text x={personX} y={base - 246} textAnchor="middle" fontSize={20} className="dim">{'chưa từng thấy'}</text>
      </motion.g>
    </svg>
  )
}
