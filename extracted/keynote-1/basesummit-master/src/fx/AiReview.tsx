import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Rubric, type Criterion } from './Rubric'
import { AiNode } from './AiNode'
import { DocGlyph } from './DocGlyph'
import { Particle } from './Particle'
import { useStep } from '../engine/step'

const CRITERIA: Criterion[] = [
  { label: 'Chất lượng', weight: 50, score: 4.5 },
  { label: 'Đúng hạn', weight: 30, score: 3.5 },
  { label: 'Tài liệu', weight: 20, score: 3.0 },
]

const PLAN = [
  'Chỉ việc đã xong',
  'Đọc công việc',
  'Review trước',
  'Chấm điểm',
  'Soạn nhận xét',
  'Theo dõi',
]

interface Props {
  /** Step at which the scores fill (default 1) and the review plan the agent
   *  builds for itself appears (default 2). */
  scoreAt?: number
  planAt?: number
  /** Run on its own: the scores fill and the plan appears on a timer, no
   *  click — for a slide with no builds. */
  auto?: boolean
  /** The document on the left — a policy in the work deck, a rule here. */
  docTitle?: string
  docMeta?: string
}

/** Feed it the policy: a rule goes into the AI node, an assessment comes out
 *  scored — and, on cue, the agent lays out the review steps it ran. Shared by
 *  the work and agent decks. 880 × 700. */
export function AiReviewFigure({ scoreAt = 1, planAt = 2, auto = false, docTitle = 'Policy', docMeta = 'the rubric, as a rule' }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const W = 880, H = 700
  const docX = 0, docY = 60, docW = 196, docH = 280
  const ai = { x: 318, y: docY + docH / 2 }
  const cardX = 470, cardY = 0, cardW = 410
  const cardMid = cardY + 180
  const p1 = `M ${docX + docW + 4} ${ai.y} L ${ai.x - 52} ${ai.y}`
  const p2 = `M ${ai.x + 52} ${ai.y} C ${ai.x + 100} ${ai.y}, ${cardX - 80} ${cardMid}, ${cardX - 4} ${cardMid}`
  const [t, setT] = useState(0)
  useEffect(() => {
    if (!auto) return
    if (reduce) { setT(2); return }
    const a = setTimeout(() => setT(1), 1600)
    const b = setTimeout(() => setT(2), 3600)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [auto, reduce])
  const scored = auto ? t >= 1 : step >= scoreAt
  const planOn = auto ? t >= 2 : step >= planAt
  const tlY = 560
  const x0 = 60, x1 = W - 60
  const gap = (x1 - x0) / (PLAN.length - 1)

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      <DocGlyph x={docX} y={docY} width={docW} height={docH} title={docTitle} meta={docMeta} lines={8} />
      <path id="ar-p1" d={p1} fill="none" stroke="var(--line-strong)" strokeWidth={1.2} />
      <path id="ar-p2" d={p2} fill="none" stroke="var(--line-strong)" strokeWidth={1.2} />
      {[0, 1].map(j => <Particle key={j} path="ar-p1" dur={2.4} begin={-j * 1.2} />)}
      {scored && [0, 1, 2].map(j => <Particle key={j} path="ar-p2" dur={2.6} begin={-j * 0.87} tone="cyan" />)}
      <AiNode cx={ai.x} cy={ai.y} r={50} />
      <Rubric x={cardX} y={cardY} width={cardW} criteria={CRITERIA} scored={scored} title="Đánh giá" tone="cyan" />

      {/* the review plan the agent builds for itself */}
      <motion.text x={x0 - 60} y={tlY - 46} fontSize={21} className="dim" initial={false} animate={{ opacity: planOn ? 1 : 0 }}>
        {'agent tự xây dựng quy trình đánh giá'}
      </motion.text>
      <motion.line x1={x0} x2={x1} y1={tlY} y2={tlY} stroke="var(--line-strong)" strokeWidth={1.4}
        initial={false} animate={{ pathLength: planOn ? 1 : 0, opacity: planOn ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 1.6, ease: 'easeInOut' }} />
      {PLAN.map((label, i) => {
        const x = x0 + i * gap
        return (
          <motion.g key={label} initial={false} animate={{ opacity: planOn ? 1 : 0, y: planOn ? 0 : 10 }}
            transition={{ duration: 0.5, delay: planOn ? 0.2 + i * 0.25 : 0, ease: [0.2, 0.8, 0.2, 1] }}>
            <circle cx={x} cy={tlY} r={9} fill="var(--navy-900)" stroke="var(--cyan-300)" strokeWidth={2} />
            <text x={x} y={tlY + 42} textAnchor="middle" fontSize={19} className={i === 0 ? 'tone-agent' : undefined}>{label}</text>
          </motion.g>
        )
      })}
    </svg>
  )
}
