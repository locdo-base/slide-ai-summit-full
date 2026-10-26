import { motion } from 'motion/react'

interface Props {
  x: number
  y: number
  width?: number
  height?: number
  title?: string
  meta?: string
  /** Number of text lines to suggest. */
  lines?: number
  /** Short lines (a guide) vs long paragraphs (a policy). */
  short?: boolean
  tone?: 'blue' | 'cyan' | 'amber'
  dashed?: boolean
}

/** A document, suggested by its lines. Rendered inside an <svg>. */
export function DocGlyph({ x, y, width = 240, height = 300, title, meta, lines = 9, short = false, tone = 'blue', dashed }: Props) {
  const pad = 24
  const top = y + (title ? 78 : 26)
  const usable = height - (top - y) - 24
  const gap = Math.min(22, usable / lines)
  const colour = tone === 'cyan' ? 'var(--cyan-300)' : tone === 'amber' ? 'var(--amber-300)' : 'var(--blue-300)'
  const widths = short
    ? [0.55, 0.42, 0.62, 0.38, 0.5, 0.44, 0.58, 0.36, 0.48, 0.4, 0.52, 0.34]
    : [0.92, 0.88, 0.95, 0.7, 0.9, 0.93, 0.86, 0.62, 0.9, 0.94, 0.85, 0.5]
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx={8} fill="var(--navy-800)" stroke={dashed ? 'var(--line)' : 'var(--line-strong)'} strokeDasharray={dashed ? '6 8' : undefined} />
      {title && <text x={x + pad} y={y + 40} fontSize={22} style={{ fontWeight: 600 }}>{title}</text>}
      {meta && <text x={x + pad} y={y + 64} fontSize={17} className="dim">{meta}</text>}
      {Array.from({ length: lines }, (_, i) => (
        <motion.line
          key={i}
          x1={x + pad} x2={x + pad + (width - pad * 2) * widths[i % widths.length]}
          y1={top + i * gap} y2={top + i * gap}
          stroke={short && i % 4 === 0 ? colour : 'var(--line-strong)'} strokeWidth={short && i % 4 === 0 ? 3 : 2.5} strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
        />
      ))}
    </g>
  )
}
