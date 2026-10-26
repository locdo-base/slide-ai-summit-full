import { motion, useReducedMotion } from 'motion/react'
import { Particle } from './Particle'
import { useStep } from '../engine/step'

interface Props { width?: number; height?: number; actorsAt?: number; id?: string }

const STAGES = ['Goal', 'Task', 'Output', 'Check-in', 'Review', 'Reward']

/** Six stages on a ring, particles running the loop, and — on cue — the two
 *  actors who share it. */
export function WorkLoop({ width = 880, height = 680, actorsAt = 1, id = 'loop' }: Props) {  const step = useStep()
  const reduce = useReducedMotion()
  const cx = width / 2, cy = height / 2, r = 248
  const pid = `${id}-ring`
  const ringD = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`
  const actorsOn = step >= actorsAt
  const ease = [0.2, 0.8, 0.2, 1] as const

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <circle cx={cx} cy={cy} r={r + 60} fill="url(#halo-blue)" />
      <motion.path id={pid} d={ringD} fill="none" stroke="var(--line-strong)" strokeWidth={1.4}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: reduce ? 0 : 1.8, ease: 'easeInOut' }} />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <Particle key={i} path={pid} dur={10} begin={-i * 1.66} r={10} tone={i % 3 === 1 ? 'cyan' : i % 3 === 2 ? 'amber' : 'blue'} />
      ))}
      {STAGES.map((label, i) => {
        const a = -Math.PI / 2 + (i / STAGES.length) * Math.PI * 2
        const x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r
        return (
          <motion.g key={label} initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.3 + i * 0.28, ease }} style={{ transformOrigin: `${x}px ${y}px` }}>
            <circle cx={x} cy={y} r={48} fill="var(--navy-800)" stroke="var(--blue-300)" strokeWidth={1.4} />
            <text x={x} y={y + 8} textAnchor="middle" fontSize={21}>{label}</text>
          </motion.g>
        )
      })}

      <motion.g initial={false} animate={{ opacity: actorsOn ? 1 : 0, scale: actorsOn ? 1 : 0.9 }}
        transition={{ duration: 0.7, ease }} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        <g transform={`translate(${cx - 78} ${cy})`}>
          <circle r={30} fill="none" stroke="var(--amber-300)" strokeWidth={2} />
          <circle r={8} cy={-6} fill="var(--amber-300)" />
          <path d="M -14 16 q 14 -18 28 0" fill="none" stroke="var(--amber-300)" strokeWidth={2.4} />
          <text y={64} textAnchor="middle" fontSize={20} className="tone-human">{'people'}</text>
        </g>
        <g transform={`translate(${cx + 78} ${cy})`}>
          <circle r={30} fill="none" stroke="var(--cyan-300)" strokeWidth={2} />
          <rect x={-11} y={-11} width={22} height={22} rx={4} fill="none" stroke="var(--cyan-300)" strokeWidth={2.2} />
          <circle r={3} cx={-4} cy={-1} fill="var(--cyan-300)" />
          <circle r={3} cx={4} cy={-1} fill="var(--cyan-300)" />
          <text y={64} textAnchor="middle" fontSize={20} className="tone-agent">{'agents'}</text>
        </g>
        <text x={cx} y={cy - 56} textAnchor="middle" fontSize={20} className="dim">{'the same loop for'}</text>
      </motion.g>
    </svg>
  )
}
