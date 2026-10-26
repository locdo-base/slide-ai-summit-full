import { motion, useReducedMotion } from 'motion/react'
import { Particle } from './Particle'

interface Props { width?: number; height?: number; id?: string; label?: string }

/** A lane of raw events passing through a ring and coming out counted. */
export function Lens({ width = 300, height = 560, id = 'lens', label = 'extract' }: Props) {
  const reduce = useReducedMotion()
  const cy = height / 2
  const pid = `${id}-lane`
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <path id={pid} d={`M -20 ${cy} L ${width + 20} ${cy}`} fill="none" stroke="var(--line)" strokeWidth={1.2} />
      {[0, 1, 2, 3].map(i => <Particle key={i} path={pid} dur={3.2} begin={-i * 0.8} r={8} />)}
      <circle cx={width / 2} cy={cy} r={70} fill="url(#halo-blue)" />
      <motion.circle cx={width / 2} cy={cy} r={54} fill="var(--navy-900)" stroke="var(--blue-300)" strokeWidth={1.6}
        initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
        style={{ transformOrigin: `${width / 2}px ${cy}px` }} />
      {!reduce && (
        <circle cx={width / 2} cy={cy} r={54} fill="none" stroke="var(--blue-300)" strokeWidth={1} opacity={0}>
          <animate attributeName="r" values="54;92" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0" dur="3s" repeatCount="indefinite" />
        </circle>
      )}
      <path d={`M ${width / 2 - 18} ${cy} h 36 M ${width / 2} ${cy - 18} v 36`} stroke="var(--blue-300)" strokeWidth={1.4} opacity={0.7} />
      <text x={width / 2} y={cy + 100} textAnchor="middle" fontSize={20} className="dim">{label}</text>
    </svg>
  )
}
