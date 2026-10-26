import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState, type ReactNode } from 'react'
import { AiNode } from './AiNode'
import { DocGlyph } from './DocGlyph'
import { Particle } from './Particle'
import { useCountUp } from './useCountUp'
import { useStep } from '../engine/step'

const ease = [0.2, 0.8, 0.2, 1] as const

function Panel({ x, y, w, h, on, children }: { x: number; y: number; w: number; h: number; on: boolean; children: ReactNode }) {
  return (
    <motion.g initial={false} animate={{ opacity: on ? 1 : 0, x: on ? 0 : 20 }} transition={{ duration: 0.5, ease }}>
      <rect x={x} y={y} width={w} height={h} rx={10} fill="var(--navy-800)" stroke="var(--line)" />
      {children}
    </motion.g>
  )
}

interface Props {
  /** Steps: the page for people at `humanAt`, the briefing for agents at
   *  `agentAt`, the other kinds of rule stacking behind at `kindsAt`. */
  humanAt?: number
  agentAt?: number
  kindsAt?: number
  /** Set, the figure runs on its own: the page for people `human` seconds
   *  after the slide lands, the briefing for agents `agent` seconds after
   *  that — no click; `humanAt` and `agentAt` are then ignored. */
  auto?: { human: number; agent: number }
}

/** One rule, read twice: the policy on the left goes through the AI node and
 *  comes out as the page people read and the short briefing agents read — with
 *  the token meter counting 3,100 down to 240. Shared by the work and agent
 *  decks (`work/08-rules`, `agent/12-both`). 1640 × 500. */
export function RuleSplitFigure({ humanAt = 1, agentAt = 2, kindsAt = 3, auto }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  /* On its own: 0 nothing yet, 1 the page for people, 2 the briefing too. */
  const [phase, setPhase] = useState(0)
  useEffect(() => {
    if (!auto || phase >= 2) return
    const t = setTimeout(() => setPhase(phase + 1), reduce ? 0 : (phase === 0 ? auto.human : auto.agent) * 1000)
    return () => clearTimeout(t)
  }, [auto, phase, reduce])
  const W = 1640, H = 500
  const doc = { x: 0, y: 44, w: 340, h: 380 }
  const ai = { x: 560, y: doc.y + doc.h / 2 }
  const px = 740, pw = W - px
  const human = { y: 0, h: 228 }
  const agent = { y: 262, h: 238 }
  const humanOn = auto ? phase >= 1 : step >= humanAt, agentOn = auto ? phase >= 2 : step >= agentAt, kindsOn = step >= kindsAt
  const tokens = useCountUp(240, agentOn, { from: 3100, duration: 1.2, delay: 0.2 })
  /* A lane's particles only start once the lane has been drawn — otherwise a
     dot rides a curve that is not there yet. */
  const DRAW = reduce ? 0 : 0.6
  const [humanDrawn, setHumanDrawn] = useState(false)
  const [agentDrawn, setAgentDrawn] = useState(false)
  useEffect(() => {
    if (!humanOn) { setHumanDrawn(false); return }
    const t = setTimeout(() => setHumanDrawn(true), DRAW * 1000)
    return () => clearTimeout(t)
  }, [humanOn, DRAW])
  useEffect(() => {
    if (!agentOn) { setAgentDrawn(false); return }
    const t = setTimeout(() => setAgentDrawn(true), DRAW * 1000)
    return () => clearTimeout(t)
  }, [agentOn, DRAW])

  const pDoc = `M ${doc.x + doc.w + 4} ${ai.y} L ${ai.x - 54} ${ai.y}`
  const pHuman = `M ${ai.x + 54} ${ai.y} C ${ai.x + 110} ${ai.y}, ${px - 100} ${human.y + human.h / 2}, ${px - 4} ${human.y + human.h / 2}`
  const pAgent = `M ${ai.x + 54} ${ai.y} C ${ai.x + 110} ${ai.y}, ${px - 100} ${agent.y + agent.h / 2}, ${px - 4} ${agent.y + agent.h / 2}`

  const lines = (x: number, y: number, ws: number[], gap: number, colour = 'var(--line-strong)', width = 2.5) =>
    ws.map((w, i) => <line key={i} x1={x} x2={x + w} y1={y + i * gap} y2={y + i * gap} stroke={colour} strokeWidth={width} strokeLinecap="round" />)

  const meterW = 300
  const meterX = px + pw - 36 - meterW
  const modes: [string, number][] = [['từ khóa', 0], ['ngữ nghĩa', 150], ['hỏi', 322]]
  const subX = 214

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      {/* other kinds of rule, stacked behind the policy */}
      {[3, 2, 1].map(i => (
        <motion.rect key={i} x={doc.x + i * 14} y={doc.y - i * 14} width={doc.w} height={doc.h} rx={8}
          fill="var(--navy-900)" stroke="var(--line)" initial={false}
          animate={{ opacity: kindsOn ? 1 : 0, x: kindsOn ? 0 : -i * 8, y: kindsOn ? 0 : i * 8 }}
          transition={{ duration: 0.6, delay: kindsOn ? i * 0.1 : 0, ease }} />
      ))}
      <DocGlyph x={doc.x} y={doc.y} width={doc.w} height={doc.h} title="Chính sách công tác và chi phí" meta="2.400 từ, 3 tệp đính kèm" lines={12} />
      <motion.text x={doc.x} y={doc.y + doc.h + 46} fontSize={21} className="muted" initial={false} animate={{ opacity: kindsOn ? 1 : 0 }} transition={{ delay: kindsOn ? 0.3 : 0 }}>
        {'chính sách, hướng dẫn, kỹ năng, playbook — bất cứ gì đáng tuân theo'}
      </motion.text>

      <path id="rs-doc" d={pDoc} fill="none" stroke="var(--line-strong)" strokeWidth={1.2} />
      {[0, 1].map(j => <Particle key={j} path="rs-doc" dur={2.6} begin={-j * 1.3} />)}
      <motion.path id="rs-human" d={pHuman} fill="none" stroke="var(--line-strong)" strokeWidth={1.2}
        initial={false} animate={{ pathLength: humanOn ? 1 : 0, opacity: humanOn ? 1 : 0 }} transition={{ duration: DRAW, ease: 'easeInOut' }} />
      <motion.path id="rs-agent" d={pAgent} fill="none" stroke="var(--line-strong)" strokeWidth={1.2}
        initial={false} animate={{ pathLength: agentOn ? 1 : 0, opacity: agentOn ? 1 : 0 }} transition={{ duration: DRAW, ease: 'easeInOut' }} />
      {humanDrawn && [0, 1].map(j => <Particle key={j} path="rs-human" dur={3} begin={-j * 1.5} tone="amber" />)}
      {agentDrawn && [0, 1, 2].map(j => <Particle key={j} path="rs-agent" dur={2.2} begin={-j * 0.73} tone="cyan" />)}
      <AiNode cx={ai.x} cy={ai.y} r={52} />

      {/* for people: the full page, and three ways to find it */}
      <Panel x={px} y={human.y} w={pw} h={human.h} on={humanOn}>
        <text x={px + 30} y={human.y + 42} fontSize={24} className="tone-human" style={{ fontWeight: 600 }}>{'Cho con người'}</text>
        <text x={px + subX} y={human.y + 42} fontSize={19} className="dim">{'trang, tệp đính kèm, toàn văn'}</text>
        {lines(px + 30, human.y + 80, [400, 360, 420, 290, 390], 17)}
        {modes.map(([l, dx]) => (
          <g key={l}>
            <rect x={px + 480 + dx} y={human.y + 68} width={l.length * 11.5 + 30} height={36} rx={18} fill="none" stroke="var(--line-strong)" />
            <text x={px + 480 + dx + 15} y={human.y + 93} fontSize={19}>{l}</text>
          </g>
        ))}
        <rect x={px + 30} y={human.y + 166} width={pw - 60} height={42} rx={21} fill="var(--navy-900)" stroke="var(--line-strong)" />
        <text x={px + 52} y={human.y + 194} fontSize={20} className="muted">{'phụ cấp ăn uống cho chuyến công tác hai ngày là bao nhiêu?'}</text>
      </Panel>

      {/* for agents: the same rule, distilled */}
      <Panel x={px} y={agent.y} w={pw} h={agent.h} on={agentOn}>
        <text x={px + 30} y={agent.y + 42} fontSize={24} className="tone-agent" style={{ fontWeight: 600 }}>{'Cho agent'}</text>
        <text x={px + subX} y={agent.y + 42} fontSize={19} className="dim">{'ngắn, chính xác, rẻ để đọc — tạo lại mỗi lần ban hành'}</text>
        <text x={px + 30} y={agent.y + 90} fontSize={19} className="tone-agent">Phạm vi</text>
        {lines(px + 116, agent.y + 84, [200, 150], 17)}
        <text x={px + 30} y={agent.y + 138} fontSize={19} className="tone-agent">Yêu cầu</text>
        {lines(px + 176, agent.y + 132, [240, 190, 210], 17)}
        <text x={px + 30} y={agent.y + 204} fontSize={19} className="tone-agent">Ngoại lệ</text>
        {lines(px + 146, agent.y + 198, [170, 120], 17)}
        <text x={meterX} y={agent.y + 90} fontSize={19} className="dim">tokens</text>
        <rect x={meterX} y={agent.y + 104} width={meterW} height={10} rx={5} fill="rgba(127,180,255,.12)" />
        <motion.rect x={meterX} y={agent.y + 104} height={10} rx={5} fill="var(--cyan-300)" initial={false}
          animate={{ width: agentOn ? meterW * (240 / 3100) + 6 : meterW }} transition={{ duration: reduce ? 0 : 1.2, delay: agentOn ? 0.2 : 0, ease }} />
        <text x={meterX} y={agent.y + 168} fontSize={46} className="sd num tone-agent">{Math.round(tokens).toLocaleString('vi-VN')}</text>
        <text x={meterX + 150} y={agent.y + 168} fontSize={19} className="dim">{'từ 3.100'}</text>
      </Panel>
    </svg>
  )
}
