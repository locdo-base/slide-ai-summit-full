import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'

interface Tile { app: string; agent: string; goal: string }

const TILES: Tile[] = [
  { app: 'Commerce · quotes & deals', agent: 'Deal copilot', goal: 'win the deal, above the margin floor' },
  { app: 'Time off · requests', agent: 'Approval assistant', goal: 'every approval right' },
  { app: 'ServiceFlow', agent: 'Flow assistant', goal: 'build the flow, fill the form' },
  { app: 'Work rules', agent: 'Ask AI', goal: 'answer from the rules, with sources' },
  { app: 'Docs', agent: 'AI assistant', goal: 'write into the page' },
  { app: 'Mail', agent: 'Auto-draft', goal: 'reply in your voice' },
  { app: 'Leads', agent: 'Scoring agent', goal: 'fit and intent, on arrival' },
  { app: 'Home', agent: 'Service assistant', goal: 'route you to the right desk' },
]

const ease = [0.2, 0.8, 0.2, 1] as const

/** Every app with its own copilot, already running; at a step, each one says
 *  what it is for. */
export function CopilotGrid({ width = 880, height = 680, tiles = TILES, goalAt = 1 }: { width?: number; height?: number; tiles?: Tile[]; goalAt?: number }) {
  const step = useStep()
  const reduce = useReducedMotion()
  const goals = step >= goalAt
  const cols = 2, gap = 22
  const w = (width - gap) / cols, h = 138
  const y0 = (height - (4 * h + 3 * gap)) / 2

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      {tiles.map((t, i) => {
        const x = (i % cols) * (w + gap), y = y0 + Math.floor(i / cols) * (h + gap)
        return (
          <motion.g key={t.app} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : 0.1 + i * 0.07, ease }}>
            <rect x={x} y={y} width={w} height={h} rx={14} fill="var(--navy-800)" stroke="var(--line)" />
            <text x={x + 24} y={y + 38} fontSize={20} className="dim">{t.app}</text>
            <text x={x + 24} y={y + 72} fontSize={26}>{t.agent}</text>
            {/* the copilot: a cyan dot, always on */}
            <circle cx={x + w - 34} cy={y + 34} r={7} fill="var(--cyan-300)" />
            {!reduce && (
              <circle cx={x + w - 34} cy={y + 34} r={7} fill="none" stroke="var(--cyan-300)" strokeWidth={1.2} opacity={0}>
                <animate attributeName="r" values="7;20" dur="2.6s" begin={`${i * 0.33}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0" dur="2.6s" begin={`${i * 0.33}s`} repeatCount="indefinite" />
              </circle>
            )}
            <text x={x + w - 50} y={y + 40} fontSize={16} textAnchor="end" className="dim">running</text>
            <motion.text x={x + 24} y={y + 108} fontSize={20} className="tone-agent" initial={false}
              animate={{ opacity: goals ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.5, delay: goals ? i * 0.06 : 0 }}>
              goal · {t.goal}
            </motion.text>
          </motion.g>
        )
      })}
    </svg>
  )
}
