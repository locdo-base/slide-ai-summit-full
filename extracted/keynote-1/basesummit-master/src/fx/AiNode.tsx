import { useReducedMotion } from 'motion/react'

interface Props { cx: number; cy: number; r?: number; label?: string }

/** The agent: a cyan core with rings breathing outward. Rendered inside an <svg>. */
export function AiNode({ cx, cy, r = 46, label = 'AI' }: Props) {
  const reduce = useReducedMotion()
  return (
    <g>
      <circle cx={cx} cy={cy} r={r * 3} fill="url(#halo-cyan)" />
      {[0, 1, 2].map(i => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="none" stroke="var(--cyan-300)" strokeWidth={1.2} opacity={0}>
          {!reduce && <>
            <animate attributeName="r" values={`${r};${r * 2.2}`} dur="3.6s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.7;0" dur="3.6s" begin={`${i * 1.2}s`} repeatCount="indefinite" />
          </>}
        </circle>
      ))}
      <circle cx={cx} cy={cy} r={r} fill="var(--navy-900)" stroke="var(--cyan-300)" strokeWidth={1.6} />
      <circle cx={cx} cy={cy} r={r - 10} fill="none" stroke="var(--cyan-300)" strokeWidth={0.8} opacity={0.5} />
      <text x={cx} y={cy + 10} textAnchor="middle" fontSize={28} className="sd tone-agent">{label}</text>
    </g>
  )
}
