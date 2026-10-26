import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'
import { Particle } from './Particle'
import { DocGlyph } from './DocGlyph'

interface Props {
  width?: number
  height?: number
  steps?: string[]
  input?: string
  output?: string
  /** Step at which the single step unfolds into several (default 1). */
  multiAt?: number
  id?: string
}

const ease = [0.2, 0.8, 0.2, 1] as const

/** A workflow agent: one input on the left, one output on the right, and the
 *  steps between — one, then several — with the same particle running the
 *  same route every time. */
export function Pipeline({ width = 880, height = 680, steps = ['Extract fields', 'Check policy', 'Draft reply'], input = 'Invoice', output = 'Approval', multiAt = 1, id = 'pl' }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const multi = step >= multiAt
  const cy = 300
  const ix = 0, ox = width - 150
  const nodes = multi ? steps : [steps[0]]
  const nodeW = 150, nodeH = 60
  const first = ix + 150 + 30 + nodeW / 2, last = ox - 30 - nodeW / 2
  const nx = (i: number) => nodes.length === 1 ? (first + last) / 2 : first + (i * (last - first)) / (nodes.length - 1)
  const route = `${id}-route`
  const d = `M ${ix + 150} ${cy} L ${ox} ${cy}`

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <path id={route} d={d} fill="none" stroke="var(--line-strong)" strokeWidth={1.4} />
      <DocGlyph x={ix} y={cy - 100} width={150} height={200} title={input} lines={5} />
      <DocGlyph x={ox} y={cy - 100} width={150} height={200} title={output} lines={4} tone="blue" />

      {nodes.map((s, i) => {
        const x = nx(i)
        return (
          <motion.g key={s} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease, layout: { duration: reduce ? 0 : 0.7, ease } }}>
            <rect x={x - nodeW / 2} y={cy - nodeH / 2} width={nodeW} height={nodeH} rx={12} fill="var(--navy-900)" stroke="var(--cyan-300)" strokeWidth={1.6} />
            <text x={x} y={cy + 7} fontSize={19} textAnchor="middle" className="tone-agent">{s}</text>
            {!reduce && (
              <circle cx={x} cy={cy} r={nodeH} fill="none" stroke="var(--cyan-300)" strokeWidth={1} opacity={0}>
                <animate attributeName="r" values={`${nodeH / 2};${nodeH}`} dur="3s" begin={`${(i / Math.max(1, nodes.length)) * 3}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.5;0" dur="3s" begin={`${(i / Math.max(1, nodes.length)) * 3}s`} repeatCount="indefinite" />
              </circle>
            )}
          </motion.g>
        )
      })}

      <Particle path={route} dur={3} begin={0} tone="blue" r={9} />
      <Particle path={route} dur={3} begin={-1.5} tone="blue" r={9} />

      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : 1 }}>
        <text x={0} y={cy + 190} fontSize={24}>{multi ? `${steps.length} steps` : '1 step'} · same input, same output</text>
        <text x={0} y={cy + 224} fontSize={20} className="dim">stateless — nothing is kept between runs</text>
      </motion.g>
      <g>
        <text x={width} y={cy + 190} fontSize={24} textAnchor="end" className="num">run 1,248</text>
        <text x={width} y={cy + 224} fontSize={20} textAnchor="end" className="dim">identical to run 1</text>
      </g>
    </svg>
  )
}
