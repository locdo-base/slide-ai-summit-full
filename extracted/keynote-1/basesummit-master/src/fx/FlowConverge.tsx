import { motion, useReducedMotion } from 'motion/react'
import { Particle, type Tone } from './Particle'

export const toneColor = (t: Tone = 'blue') =>
  t === 'cyan' ? 'var(--cyan-300)' : t === 'amber' ? 'var(--amber-300)' : 'var(--blue-300)'

export interface Source { label: string; tone?: Tone }

/** Seconds a meteor takes to cross its lane — no two neighbouring lanes alike. */
const SPEEDS = [3.6, 5.2, 4.1, 3.1, 4.7, 3.4, 5.6, 3.9]

interface Props {
  sources: Source[]
  target: string
  targetSub?: string
  width?: number
  height?: number
  id?: string
}

/** Many labelled sources on the left, curved lanes carrying meteors into one
 *  target on the right. The deck's signature image: everything flows into one.
 *  The lanes draw first; only once a lane is complete do its meteors launch
 *  from the chip, one after another, and slide in under the target. */
export function FlowConverge({ sources, target, targetSub, width = 880, height = 680, id = 'fc' }: Props) {
  const reduce = useReducedMotion()
  const chipW = 236, chipH = 46, x0 = 0
  const startX = x0 + chipW + 14
  const tW = 250, tH = 128
  const tx = width - tW - 10
  const cy = height / 2
  const endX = tx + 10
  const n = sources.length
  const ys = sources.map((_, i) => 36 + (i + 0.5) * ((height - 72) / n))
  const ease = [0.2, 0.8, 0.2, 1] as const
  const lineDelay = (i: number) => 0.15 + i * 0.07, lineDur = 1.1

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <circle cx={tx + tW / 2} cy={cy} r={240} fill="url(#halo-blue)" />
      {sources.map((s, i) => {
        const y = ys[i]
        const pid = `${id}-p${i}`
        const d = `M ${startX} ${y} C ${startX + 240} ${y}, ${endX - 220} ${cy}, ${endX} ${cy}`
        return (
          <g key={i}>
            <motion.path
              id={pid} d={d} fill="none" stroke="var(--line-strong)" strokeWidth={1.2}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: reduce ? 0 : lineDur, delay: reduce ? 0 : lineDelay(i), ease: 'easeInOut' }}
            />
            {/* One meteor per lane, each at its own speed, launched once its lane has drawn. */}
            <Particle path={pid} dur={SPEEDS[i % SPEEDS.length]} begin={lineDelay(i) + lineDur + i * 0.12} r={3} tail={56} tone={s.tone} />
            <motion.g
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.06, ease }}
            >
              <rect x={x0} y={y - chipH / 2} width={chipW} height={chipH} rx={6} fill="var(--navy-800)" stroke="var(--line)" />
              <circle cx={x0 + 22} cy={y} r={5} fill={toneColor(s.tone)} />
              <text x={x0 + 40} y={y + 8} fontSize={23}>{s.label}</text>
            </motion.g>
          </g>
        )
      })}
      <motion.g
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease }}
        style={{ transformOrigin: `${tx + tW / 2}px ${cy}px` }}
      >
        <rect x={tx} y={cy - tH / 2} width={tW} height={tH} rx={10} fill="var(--navy-800)" stroke="var(--blue-300)" strokeWidth={1.5}>
          <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2.6s" repeatCount="indefinite" />
        </rect>
        <text x={tx + tW / 2} y={cy + (targetSub ? 4 : 13)} textAnchor="middle" fontSize={36} className="sd">{target}</text>
        {targetSub && <text x={tx + tW / 2} y={cy + 42} textAnchor="middle" fontSize={21} className="muted">{targetSub}</text>}
      </motion.g>
    </svg>
  )
}
