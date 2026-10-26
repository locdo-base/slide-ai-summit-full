import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'
import { AiNode } from './AiNode'
import { Laptop } from './KindGlyphs'
import { Particle } from './Particle'

interface Props {
  width?: number
  height?: number
  desktop?: string[]
  internal?: string[]
  external?: string[]
  /** Steps: internal tools appear at `internalAt`, external at `externalAt`. */
  internalAt?: number
  externalAt?: number
  id?: string
}

const ease = [0.2, 0.8, 0.2, 1] as const

function Chips({ x, y, items, tone, cols = 3, w = 168, on, delay = 0 }: { x: number; y: number; items: string[]; tone: string; cols?: number; w?: number; on: boolean; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <g>
      {items.map((it, i) => {
        const cx = x + (i % cols) * (w + 12), cy = y + Math.floor(i / cols) * 52
        return (
          <motion.g key={it} initial={false} animate={{ opacity: on ? 1 : 0, y: on ? 0 : 10 }}
            transition={{ duration: reduce ? 0 : 0.5, delay: on ? delay + i * 0.06 : 0, ease }}>
            <rect x={cx} y={cy} width={w} height={40} rx={7} fill="var(--navy-800)" stroke="var(--line)" />
            <circle cx={cx + 18} cy={cy + 20} r={4.5} fill={tone} />
            <text x={cx + 32} y={cy + 27} fontSize={20}>{it}</text>
          </motion.g>
        )
      })}
    </g>
  )
}

/** Two runtimes side by side: the owner's own computer for the desktop agent,
 *  and the platform for every other kind — with its internal and external tools. */
export function RuntimeMap({
  width = 1640, height = 500,
  desktop = ['Running apps', 'Browser tabs', 'Open a page', 'Read a page', 'Run code', 'Live audio'],
  internal = ['Web search', 'Summarizer', 'Translator', 'PII redactor', 'Image OCR', 'Invoice extractor'],
  external = ['MCP · sse', 'MCP · stdio', 'HTTP API'],
  internalAt = 1, externalAt = 2, id = 'rt',
}: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const showInt = step >= internalAt
  const showExt = step >= externalAt
  const lx = 0, rx = 860
  const panelW = 760

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {/* desktop runtime */}
      <rect x={lx} y={0} width={panelW} height={height} rx={18} fill="none" stroke="var(--amber-300)" strokeWidth={1.6} strokeDasharray="12 9" opacity={0.85} />
      <text x={lx + 30} y={46} fontSize={26} className="tone-human">Desktop runtime</text>
      <text x={lx + panelW - 30} y={46} fontSize={20} textAnchor="end" className="dim">your own computer</text>
      <Laptop x={lx + 60} y={130} w={200} />
      <AiNode cx={lx + 160} cy={186} r={34} label="AI" />
      <path id={`${id}-d`} d={`M ${lx + 290} ${186} C ${lx + 340} ${186}, ${lx + 340} ${140}, ${lx + 390} ${140}`} fill="none" stroke="var(--line-strong)" strokeWidth={1.2} />
      <Particle path={`${id}-d`} dur={2.4} begin={-0.5} tone="amber" r={7} />
      <Chips x={lx + 400} y={100} items={desktop} tone="var(--amber-300)" cols={2} w={160} on delay={reduce ? 0 : 0.3} />
      <text x={lx + 30} y={height - 34} fontSize={20} className="dim">runs on the machine, with the machine's own access — nothing to wire up</text>

      {/* platform runtime */}
      <rect x={rx} y={0} width={panelW} height={height} rx={18} fill="none" stroke="var(--blue-400)" strokeWidth={1.6} opacity={0.85} />
      <text x={rx + 30} y={46} fontSize={26} className="tone-blue">Platform runtime</text>
      <text x={rx + panelW - 30} y={46} fontSize={20} textAnchor="end" className="dim">assistants, copilots, workflows, experts</text>
      <AiNode cx={rx + 120} cy={200} r={40} label="AI" />
      <path id={`${id}-i`} d={`M ${rx + 166} ${200} C ${rx + 230} ${200}, ${rx + 230} ${120}, ${rx + 300} ${120}`} fill="none" stroke="var(--line-strong)" strokeWidth={1.2} opacity={showInt ? 1 : 0} />
      <path id={`${id}-e`} d={`M ${rx + 166} ${200} C ${rx + 230} ${200}, ${rx + 230} ${330}, ${rx + 300} ${330}`} fill="none" stroke="var(--line-strong)" strokeWidth={1.2} opacity={showExt ? 1 : 0} />
      {showInt && <Particle path={`${id}-i`} dur={2.4} begin={-0.8} tone="cyan" r={7} />}
      {showExt && <Particle path={`${id}-e`} dur={2.6} begin={-1.4} tone="blue" r={7} />}
      <motion.text x={rx + 310} y={104} fontSize={22} className="tone-agent" initial={false} animate={{ opacity: showInt ? 1 : 0 }}>Internal tools</motion.text>
      <Chips x={rx + 310} y={116} items={internal} tone="var(--cyan-300)" cols={2} w={210} on={showInt} />
      <motion.text x={rx + 310} y={314} fontSize={22} className="tone-blue" initial={false} animate={{ opacity: showExt ? 1 : 0 }}>External tools</motion.text>
      <Chips x={rx + 310} y={326} items={external} tone="var(--blue-300)" cols={3} w={132} on={showExt} />
      <text x={rx + 30} y={height - 34} fontSize={20} className="dim">runs from a declared contract; the outside comes in as a connection</text>
    </svg>
  )
}
