import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'
import { Particle } from './Particle'
import { AiNode } from './AiNode'
import { useCountUp } from './useCountUp'

interface Group { label: string; items: string[] }

interface Props {
  width?: number
  height?: number
  groups?: Group[]
  /** Step at which the calls start flowing (default 1). */
  callAt?: number
  /** Step at which the budget meter appears (default 2). */
  budgetAt?: number
  id?: string
}

const DEFAULT_GROUPS: Group[] = [
  { label: 'Copilots', items: ['Pipeline', 'Requests', 'Tasks'] },
  { label: 'Workflow agents', items: ['Quote → PDF', 'Invoice check'] },
  { label: 'Experts', items: ['Legal', 'Tax'] },
]

const ease = [0.2, 0.8, 0.2, 1] as const

/** A personal agent on the left calling out to service, workflow and expert
 *  agents on the right; calls leave in blue, answers return in cyan. */
export function Orchestrate({ width = 880, height = 680, groups = DEFAULT_GROUPS, callAt = 1, budgetAt = 2, id = 'or' }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const calling = step >= callAt
  const budget = step >= budgetAt
  const px = 130, py = 300
  const gx = 470
  const rowH = 150
  const y0 = 80
  const used = Math.round(useCountUp(38, budget))

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <circle cx={px} cy={py} r={150} fill="url(#halo-blue)" />

      {groups.map((g, i) => {
        const gy = y0 + i * rowH + 20
        const pid = `${id}-c${i}`
        const rid = `${id}-r${i}`
        const ex = gx - 8
        const call = `M ${px + 62} ${py} C ${px + 220} ${py}, ${ex - 200} ${gy + 30}, ${ex} ${gy + 30}`
        const back = `M ${ex} ${gy + 46} C ${ex - 200} ${gy + 46}, ${px + 220} ${py + 16}, ${px + 62} ${py + 16}`
        return (
          <g key={g.label}>
            <path id={pid} d={call} fill="none" stroke="none" />
            <path id={rid} d={back} fill="none" stroke="none" />
            <motion.path d={call} fill="none" stroke="var(--line-strong)" strokeWidth={1.2}
              initial={false} animate={{ pathLength: calling ? 1 : 0, opacity: calling ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.9, delay: calling ? i * 0.15 : 0, ease: 'easeInOut' }} />
            <motion.path d={back} fill="none" stroke="var(--line)" strokeWidth={1}
              initial={false} animate={{ pathLength: calling ? 1 : 0, opacity: calling ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.9, delay: calling ? 0.4 + i * 0.15 : 0, ease: 'easeInOut' }} />
            {calling && <>
              <Particle path={pid} dur={3.2} begin={-i * 0.7} tone="blue" r={7} />
              <Particle path={pid} dur={3.2} begin={-1.6 - i * 0.7} tone="blue" r={7} />
              <Particle path={rid} dur={3.6} begin={-0.9 - i * 0.5} tone="cyan" r={7} />
            </>}
            <motion.g initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.2 + i * 0.1, ease }}>
              <text x={gx} y={gy} fontSize={22} className="tone-agent">{g.label}</text>
              {g.items.map((it, j) => {
                const w = 42 + it.length * 10.5
                const x = gx + g.items.slice(0, j).reduce((a, p) => a + 42 + p.length * 10.5 + 12, 0)
                return (
                  <g key={it}>
                    <rect x={x} y={gy + 14} width={w} height={40} rx={7} fill="var(--navy-800)" stroke="var(--line)" />
                    <circle cx={x + 18} cy={gy + 34} r={4} fill="var(--cyan-300)" />
                    <text x={x + 32} y={gy + 41} fontSize={19}>{it}</text>
                  </g>
                )
              })}
            </motion.g>
          </g>
        )
      })}

      {/* the personal agent */}
      <circle cx={px} cy={py} r={104} fill="none" stroke="var(--amber-300)" strokeWidth={1.6} strokeDasharray="10 8" opacity={0.8} />
      <AiNode cx={px} cy={py} r={50} label="you" />
      <text x={px} y={py + 140} fontSize={22} textAnchor="middle" className="tone-human">Assistant · Desktop</text>
      <text x={px} y={py + 168} fontSize={19} textAnchor="middle" className="dim">personal scope</text>

      {/* budget meter */}
      <motion.g initial={false} animate={{ opacity: budget ? 1 : 0, y: budget ? 0 : 10 }} transition={{ duration: reduce ? 0 : 0.6, ease }}>
        <text x={0} y={580} fontSize={22}>Reasoning &amp; orchestration budget</text>
        <text x={width} y={580} fontSize={20} textAnchor="end" className="dim">set automatically</text>
        <rect x={0} y={596} width={width} height={10} rx={5} fill="rgba(127,180,255,0.14)" />
        <motion.rect x={0} y={596} height={10} rx={5} fill="var(--blue-400)" initial={false}
          animate={{ width: budget ? width * 0.38 : 0 }} transition={{ duration: reduce ? 0 : 1.4, ease }} />
        <text x={0} y={634} fontSize={19} className="dim">{used}% used today · calls to copilots, workflows and experts are metered together</text>
      </motion.g>
    </svg>
  )
}
