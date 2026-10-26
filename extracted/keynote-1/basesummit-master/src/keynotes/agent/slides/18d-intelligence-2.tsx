import type { ReactNode } from 'react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* Intelligence 2.0 — the 2027 research agenda in four glass boxes, arriving
 * on the clock (the deck entry's autoplay), no clicks; the last two (Eric's
 * third note, team agents and the AI workspace) arrive together. */

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

/** A loop closing on itself, a spark inside — agents getting smarter as they work. */
const LoopGlyph = () => (
  <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M20 12a8 8 0 1 1-2.3-5.7" /><path d="M20 4v4h-4" />
    <path d="M12 8.5l1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1z" fill="currentColor" stroke="none" />
  </svg>
)
/** Two arrows chasing each other round a check — outcomes fed back in. */
const RlGlyph = () => (
  <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <path d="M4 12a8 8 0 0 1 13.7-5.6" /><path d="M18 3v4h-4" />
    <path d="M20 12a8 8 0 0 1-13.7 5.6" /><path d="M6 21v-4h4" />
    <path d="M9.5 12l1.8 1.8 3.5-3.8" />
  </svg>
)
/** Three agents, joined. */
const TeamGlyph = () => (
  <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <circle cx="12" cy="6" r="2.6" /><circle cx="5.5" cy="17.5" r="2.6" /><circle cx="18.5" cy="17.5" r="2.6" />
    <path d="M10.7 8.2 7 15.3M13.3 8.2l3.7 7.1M8.1 17.5h7.8" />
  </svg>
)
/** A window with a sidebar and a spark in the pane — the agent at the desk. */
const WorkspaceGlyph = () => (
  <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
    <rect x="3" y="4" width="18" height="15" rx="2.5" /><path d="M3 8.5h18M8 8.5V19" />
    <path d="M14.5 11.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" fill="currentColor" stroke="none" />
  </svg>
)

const BOXES: { at: number; title: string; text: string; glyph: ReactNode }[] = [
  {
    at: 1, title: 'Self-improving agents', glyph: <LoopGlyph />,
    text: 'Agent ngày càng thông minh hơn khi thực hiện nhiều công việc hơn.',
  },
  {
    at: 2, title: 'Reinforcement learning', glyph: <RlGlyph />,
    text: 'RLSO: Reinforcement Learning with managed Service Outputs.',
  },
  {
    at: 3, title: 'Team agents', glyph: <TeamGlyph />,
    text: 'Agent Orchestration: nhiều agent cùng lên kế hoạch và làm việc với con người.',
  },
  {
    at: 3, title: 'AI Workspace', glyph: <WorkspaceGlyph />,
    text: 'Không gian và runtime riêng để nhiều agent và con người cùng làm việc.',
  },
]

export function IntelligenceTwoSlide() {  return (
    <SlideFrame
      chapter="operation"
      layout="stack"
      headline="Intelligence 2.0: Thông minh hơn nữa."
      lead="Những kế hoạch và nghiên cứu lớn chúng tôi sẽ thực hiện trong năm 2027."
    >
      <div className="i2-boxes">
        {BOXES.map((b, i) => (
          <Reveal key={b.title} at={b.at} delay={i === 3 ? 0.15 : 0}>
            <div className="i2-box">
              <span className="i2-n">0{i + 1}</span>
              {b.glyph}
              <h3>{b.title}</h3>
              <p>{b.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  )
}
