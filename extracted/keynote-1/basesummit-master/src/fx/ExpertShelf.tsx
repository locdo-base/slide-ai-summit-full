import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'

const EXPERTS = ['Contract Reader', 'Inbox Triage', 'Release Notes', 'Data Quality', 'Meeting Recap', 'Security review']

const ease = [0.2, 0.8, 0.2, 1] as const

function Mark({ x, y, r = 16 }: { x: number; y: number; r?: number }) {
  const C = 'var(--cyan-300)'
  return (
    <g>
      <rect x={x - r} y={y - r * 0.8} width={r * 2} height={r * 1.6} rx={r * 0.35} fill="var(--navy-900)" stroke={C} strokeWidth={2} />
      <circle cx={x - r * 0.38} cy={y} r={r * 0.17} fill={C} />
      <circle cx={x + r * 0.38} cy={y} r={r * 0.17} fill={C} />
      <path d={`M ${x} ${y - r * 0.8} v ${-r * 0.4}`} stroke={C} strokeWidth={2} strokeLinecap="round" />
    </g>
  )
}

/** Expert agents on a shared shelf; at a step, one is hired into the workspace. */
export function ExpertShelf({ width = 880, height = 680, hireAt = 1, hired = 0 }: { width?: number; height?: number; hireAt?: number; hired?: number }) {
  const step = useStep()
  const reduce = useReducedMotion()
  const on = step >= hireAt
  const cardW = 136, cardH = 150, gap = (width - EXPERTS.length * cardW) / (EXPERTS.length - 1)
  const shelfY = 60
  const wsY = 400, wsH = 250

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <text x={0} y={30} fontSize={22} className="tone-agent">Shared across the platform</text>
      <text x={width} y={30} fontSize={20} textAnchor="end" className="dim">one copy, every workspace</text>
      <line x1={0} y1={shelfY + cardH + 12} x2={width} y2={shelfY + cardH + 12} stroke="var(--line-strong)" strokeWidth={1.4} />

      {/* the workspace */}
      <rect x={0} y={wsY} width={width} height={wsH} rx={18} fill="none" stroke="var(--blue-400)" strokeWidth={1.6} />
      <text x={24} y={wsY + 40} fontSize={22} className="tone-blue">Northwind Logistics</text>
      <text x={width - 24} y={wsY + 40} fontSize={20} textAnchor="end" className="dim">workspace</text>
      {[['Grace', 'assistant', 'var(--amber-300)'], ['Deal-risk analyst', 'agent', 'var(--cyan-300)'], ['Invoice triage', 'agent', 'var(--cyan-300)']].map(([n, k, c], i) => (
        <g key={n}>
          <rect x={24 + i * 214} y={wsY + 70} width={200} height={64} rx={10} fill="var(--navy-800)" stroke="var(--line)" />
          <circle cx={24 + i * 214 + 22} cy={wsY + 102} r={5} fill={c} />
          <text x={24 + i * 214 + 38} y={wsY + 98} fontSize={20}>{n}</text>
          <text x={24 + i * 214 + 38} y={wsY + 122} fontSize={16} className="dim">{k}</text>
        </g>
      ))}

      {EXPERTS.map((e, i) => {
        const x = i * (cardW + gap)
        const isHired = i === hired && on
        const tx = isHired ? 24 + 3 * 214 - x : 0
        const ty = isHired ? wsY + 70 - shelfY : 0
        return (
          <motion.g key={e} initial={false} animate={{ x: tx, y: ty }} transition={{ duration: reduce ? 0 : 1.0, ease }}>
            <rect x={x} y={shelfY} width={isHired ? 200 : cardW} height={isHired ? 64 : cardH} rx={10} fill="var(--navy-800)" stroke="var(--cyan-300)" strokeWidth={1.4}
              style={{ transition: reduce ? undefined : 'height 0.6s, width 0.6s' }} />
            {!isHired && <Mark x={x + cardW / 2} y={shelfY + 52} />}
            <text x={x + (isHired ? 14 : cardW / 2)} y={shelfY + (isHired ? 28 : 106)} fontSize={17} textAnchor={isHired ? 'start' : 'middle'}>{e}</text>
            {!isHired && <text x={x + cardW / 2} y={shelfY + 132} fontSize={15} textAnchor="middle" className="dim">expert</text>}
            {isHired && <text x={x + 14} y={shelfY + 52} fontSize={16} className="tone-agent">hired · expert</text>}
          </motion.g>
        )
      })}

      <motion.g initial={false} animate={{ opacity: on ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.5, delay: on ? 0.9 : 0 }}>
        <text x={24} y={wsY + wsH - 26} fontSize={19} className="dim">Hired into the workspace — its boundary is the platform, its work is yours.</text>
      </motion.g>
    </svg>
  )
}
