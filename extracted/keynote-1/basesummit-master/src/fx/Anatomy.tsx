import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'
import { AiNode } from './AiNode'
import { Particle } from './Particle'

interface Chip { label: string; kind: 'tool' | 'skill' }

interface Props {
  width?: number
  height?: number
  /** Chips docked on the harness ring — tools (blue) and skills (cyan). */
  chips?: Chip[]
  /** Build step at which the boundary draws itself (default 1). */
  boundaryAt?: number
  boundaryLabel?: string
  boundarySub?: string
  id?: string
}

const DEFAULT_CHIPS: Chip[] = [
  { label: 'Search', kind: 'tool' },
  { label: 'Tasks', kind: 'tool' },
  { label: 'Mail', kind: 'tool' },
  { label: 'Quote review', kind: 'skill' },
]

const ease = [0.2, 0.8, 0.2, 1] as const

/** The anatomy of an agent: a model at the core, the harness as a loop around
 *  it, tools and skills docked on that loop, a runtime it stands on — and,
 *  at a build step, the boundary drawn around all of it. */
export function Anatomy({ width = 880, height = 680, chips = DEFAULT_CHIPS, boundaryAt = 1, boundaryLabel = 'Boundary', boundarySub = 'the work and resources it may touch', id = 'an' }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const cx = 440, cy = 320, R = 150
  const loop = `${id}-loop`
  const angles = [-55, -18, 18, 55]
  const bounded = step >= boundaryAt
  const d = (s: number) => (reduce ? 0 : s)

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {/* the loop the particle rides — a full circle starting at the top */}
      <path id={loop} d={`M ${cx} ${cy - R} a ${R} ${R} 0 1 1 -0.01 0`} fill="none" stroke="none" />

      {/* runtime plate */}
      <motion.g initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: d(0.7), delay: d(1.7), ease }}>
        <line x1={cx} y1={cy + R} x2={cx} y2={540} stroke="var(--line-strong)" strokeWidth={1.2} />
        <rect x={cx - 240} y={540} width={480} height={58} rx={10} fill="var(--navy-800)" stroke="var(--line-strong)" />
        <text x={cx - 216} y={577} fontSize={24}>Runtime</text>
        <text x={cx + 216} y={577} fontSize={20} textAnchor="end" className="dim">where it runs</text>
      </motion.g>

      {/* harness ring */}
      <motion.circle
        cx={cx} cy={cy} r={R} fill="none" stroke="var(--line-strong)" strokeWidth={1.4}
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: d(1.1), delay: d(0.5), ease: 'easeInOut' }}
      />
      <Particle path={loop} dur={7} begin={-1} tone="cyan" r={8} />
      <Particle path={loop} dur={7} begin={-4.5} tone="cyan" r={8} />
      <motion.g initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: d(0.6), delay: d(1.0), ease }}>
        <line x1={148} y1={cy} x2={cx - R - 6} y2={cy} stroke="var(--line)" strokeWidth={1.2} />
        <text x={40} y={cy - 8} fontSize={26}>Harness</text>
        <text x={40} y={cy + 22} fontSize={20} className="dim">the loop it runs</text>
      </motion.g>

      {/* tools and skills docked on the ring */}
      <motion.text x={cx + 100} y={150} fontSize={26} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: d(0.5), delay: d(1.2) }}>
        Tools &amp; skills
      </motion.text>
      {chips.map((c, i) => {
        const a = (angles[i % angles.length] * Math.PI) / 180
        const dx = cx + R * Math.cos(a), dy = cy + R * Math.sin(a)
        const x = dx + 16, y = dy - 20
        const tone = c.kind === 'skill' ? 'var(--cyan-300)' : 'var(--blue-300)'
        return (
          <motion.g key={c.label} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: d(0.6), delay: d(1.25 + i * 0.12), ease }}>
            <circle cx={dx} cy={dy} r={5} fill={tone} />
            <rect x={x} y={y} width={176} height={40} rx={7} fill="var(--navy-800)" stroke="var(--line)" />
            <circle cx={x + 20} cy={y + 20} r={4.5} fill={tone} />
            <text x={x + 36} y={y + 27} fontSize={21}>{c.label}</text>
          </motion.g>
        )
      })}

      {/* model at the core */}
      <motion.g initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} style={{ transformOrigin: `${cx}px ${cy}px` }} transition={{ duration: d(0.7), delay: d(0.15), ease }}>
        <AiNode cx={cx} cy={cy} r={58} label="Model" />
      </motion.g>

      {/* boundary — drawn by the human, so it takes the human colour */}
      <motion.rect
        x={28} y={44} width={width - 56} height={height - 70} rx={26}
        fill="none" stroke="var(--amber-300)" strokeWidth={2} strokeDasharray="14 10"
        initial={false}
        animate={{ pathLength: bounded ? 1 : 0, opacity: bounded ? 1 : 0 }}
        transition={{ duration: d(1.3), ease: 'easeInOut' }}
      />
      <motion.g initial={false} animate={{ opacity: bounded ? 1 : 0, y: bounded ? 0 : 8 }} transition={{ duration: d(0.6), delay: bounded ? d(0.9) : 0, ease }}>
        <text x={54} y={height - 4} fontSize={26} className="tone-human">{boundaryLabel}</text>
        <text x={54 + boundaryLabel.length * 15 + 22} y={height - 4} fontSize={20} className="dim">{boundarySub}</text>
      </motion.g>
    </svg>
  )
}
