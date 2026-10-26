import { motion, useReducedMotion } from 'motion/react'
import { useCountUp } from './useCountUp'

export interface Criterion { label: string; weight: number; score: number }
export interface Band { label: string; min: number }

export const DEFAULT_CRITERIA: Criterion[] = [
  { label: 'Quality', weight: 40, score: 4.5 },
  { label: 'Timeliness', weight: 25, score: 3.5 },
  { label: 'Collaboration', weight: 20, score: 4.0 },
  { label: 'Documentation', weight: 15, score: 3.0 },
]
export const DEFAULT_BANDS: Band[] = [
  { label: 'Vượt', min: 4.2 },
  { label: 'Đạt', min: 3.0 },
  { label: 'Chưa đạt', min: 0 },
]

export const weightedTotal = (cs: Criterion[]) =>
  cs.reduce((s, c) => s + c.score * c.weight, 0) / cs.reduce((s, c) => s + c.weight, 0)

const ROW_H = 72, HEAD_H = 66, FOOT_H = 118, PAD = 28

export const rubricHeight = (n: number) => HEAD_H + n * ROW_H + FOOT_H + 8

interface Props {
  x?: number
  y?: number
  width?: number
  criteria?: Criterion[]
  bands?: Band[]
  scale?: number
  /** When true the bars fill and the total counts up. */
  scored: boolean
  title?: string
  /** Bar tone: the scorer's colour. */
  tone?: 'blue' | 'cyan' | 'amber'
  delay?: number
}

/** A rubric card: criteria with weights, a scale, verdict bands — and the bars
 *  that fill when something is scored against it. Rendered inside an <svg>. */
export function Rubric({ x = 0, y = 0, width = 430, criteria = DEFAULT_CRITERIA, bands = DEFAULT_BANDS, scale = 5, scored, title = 'Rubric', tone = 'blue', delay = 0 }: Props) {
  const reduce = useReducedMotion()
  const total = weightedTotal(criteria)
  const shown = useCountUp(total, scored, { duration: 1.6, delay: delay + 0.6 })
  const verdict = bands.find(b => total >= b.min)?.label ?? ''
  const colour = tone === 'cyan' ? 'var(--cyan-300)' : tone === 'amber' ? 'var(--amber-300)' : 'var(--blue-400)'
  const inner = width - PAD * 2
  const bodyH = criteria.length * ROW_H
  const h = rubricHeight(criteria.length)
  const ease = [0.2, 0.8, 0.2, 1] as const

  return (
    <g>
      <rect x={x} y={y} width={width} height={h} rx={12} fill="var(--navy-800)" stroke="var(--line)" />
      <text x={x + PAD} y={y + 42} fontSize={26} className="sd">{title}</text>
      <text x={x + width - PAD} y={y + 42} textAnchor="end" fontSize={19} className="dim">thang 0 đến {scale}</text>
      <line x1={x + PAD} x2={x + width - PAD} y1={y + HEAD_H} y2={y + HEAD_H} stroke="var(--line)" />

      {criteria.map((c, i) => {
        const top = y + HEAD_H + i * ROW_H
        const w = (c.score / scale) * inner
        const labelW = c.label.length * 12.4 + 14
        return (
          <g key={c.label}>
            <text x={x + PAD} y={top + 30} fontSize={22}>{c.label}</text>
            <text x={x + PAD + labelW} y={top + 30} fontSize={17} className="dim">{c.weight}%</text>
            <motion.text
              x={x + width - PAD} y={top + 30} textAnchor="end" fontSize={22} className="num"
              initial={false} animate={{ opacity: scored ? 1 : 0 }} transition={{ delay: scored ? delay + i * 0.15 + 0.6 : 0 }}
            >{c.score.toFixed(1)}</motion.text>
            <rect x={x + PAD} y={top + 46} width={inner} height={8} rx={4} fill="rgba(127,180,255,.12)" />
            <motion.rect
              x={x + PAD} y={top + 46} height={8} rx={4} fill={colour}
              initial={false}
              animate={{ width: scored ? w : 0, opacity: scored ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 1.1, delay: scored ? delay + i * 0.15 : 0, ease }}
            />
          </g>
        )
      })}

      <line x1={x + PAD} x2={x + width - PAD} y1={y + HEAD_H + bodyH + 6} y2={y + HEAD_H + bodyH + 6} stroke="var(--line)" />
      <g transform={`translate(${x + PAD} ${y + HEAD_H + bodyH + 6})`}>
        <text x={0} y={40} fontSize={18} className="dim">tổng có trọng số</text>
        <motion.text x={0} y={94} fontSize={46} className="sd num" initial={false} animate={{ opacity: scored ? 1 : 0.3 }}>
          {scored ? shown.toFixed(1) : '–'}
        </motion.text>
        <g transform={`translate(${inner} 0)`}>
          {bands.map((b, i) => {
            const on = scored && b.label === verdict
            return (
              <motion.text key={b.label} x={0} y={36 + i * 29} textAnchor="end" fontSize={20}
                initial={false}
                animate={{ opacity: on ? 1 : 0.45, fill: on ? colour : 'var(--muted)' }}
                transition={{ delay: scored ? delay + 1.8 : 0 }}
                style={{ fontWeight: on ? 600 : 400 }}>
                {b.label}{b.min > 0 ? `  ${b.min.toFixed(1)}+` : ''}
              </motion.text>
            )
          })}
        </g>
      </g>
    </g>
  )
}
