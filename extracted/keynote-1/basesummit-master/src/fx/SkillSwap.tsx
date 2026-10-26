import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'
import { AiNode } from './AiNode'

interface Company { name: string; skills: string[] }

interface Props {
  width?: number
  height?: number
  companies?: Company[]
  /** The company shown at step s is companies[min(s, n-1)]. */
  id?: string
}

const DEFAULT: Company[] = [
  { name: 'Northwind Logistics', skills: ['Customs filing', 'Route pricing', 'Fleet checks', 'Tender review', 'Claims'] },
  { name: 'Bright Clinic', skills: ['Patient intake', 'Claims coding', 'Roster', 'Lab follow-up', 'Referrals'] },
]

const ease = [0.2, 0.8, 0.2, 1] as const

/** The same anatomy, a different set of skills — one company, then another. */
export function SkillSwap({ width = 880, height = 680, companies = DEFAULT }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const co = companies[Math.min(step, companies.length - 1)]
  const cx = 440, cy = 320, R = 190
  const slots = co.skills.map((_, i) => {
    const a = ((-90 + (i * 360) / co.skills.length) * Math.PI) / 180
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) }
  })

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="var(--line)" strokeWidth={1.2} strokeDasharray="4 8" />
      <AiNode cx={cx} cy={cy} r={54} label="Model" />
      <text x={cx} y={cy + 100} fontSize={20} textAnchor="middle" className="dim">same model, same harness</text>

      <AnimatePresence mode="popLayout">
        {co.skills.map((s, i) => {
          const p = slots[i]
          const w = 26 + s.length * 11.5
          return (
            <motion.g key={`${co.name}-${s}`}
              initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }}
              style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : 0.08 * i, ease }}>
              <line x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--line)" strokeWidth={1} />
              <rect x={p.x - w / 2} y={p.y - 22} width={w} height={44} rx={22} fill="var(--navy-800)" stroke="var(--cyan-300)" strokeWidth={1.4} />
              <text x={p.x} y={p.y + 7} fontSize={21} textAnchor="middle" className="tone-agent">{s}</text>
            </motion.g>
          )
        })}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.text key={co.name} x={cx} y={cy + R + 84} fontSize={26} textAnchor="middle"
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: reduce ? 0 : 0.4 }}>
          {co.name}
        </motion.text>
      </AnimatePresence>
    </svg>
  )
}
