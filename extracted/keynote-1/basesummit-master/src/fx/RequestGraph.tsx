import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Particle } from './Particle'
import { useStep } from '../engine/step'

const C = 'var(--cyan-300)', A = 'var(--amber-300)', L = 'var(--line-strong)'
const MONO = 'ui-monospace, SFMono-Regular, Consolas, monospace'
const ease = [0.2, 0.8, 0.2, 1] as const

interface Node { label: string; w: number; agent?: boolean; who?: string }

const NODES: Node[] = [
  { label: 'Submit', w: 118, who: 'Quinn' },
  { label: 'Kiểm tra rule', w: 186, agent: true },
  { label: 'Quản lý duyệt', w: 236, who: 'Brian' },
  { label: 'Tài chính', w: 124, who: 'Jane' },
  { label: 'Done', w: 92 },
]

function Mark({ x, y, r = 11 }: { x: number; y: number; r?: number }) {
  return (
    <g>
      <rect x={x - r} y={y - r * 0.8} width={r * 2} height={r * 1.6} rx={r * 0.35} fill="var(--navy-900)" stroke={C} strokeWidth={1.8} />
      <circle cx={x - r * 0.38} cy={y} r={r * 0.17} fill={C} />
      <circle cx={x + r * 0.38} cy={y} r={r * 0.17} fill={C} />
      <path d={`M ${x} ${y - r * 0.8} v ${-r * 0.4}`} stroke={C} strokeWidth={1.8} strokeLinecap="round" />
    </g>
  )
}

function Person({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y - 5} r={5} fill={A} />
      <path d={`M ${x - 9} ${y + 10} q 9 -13 18 0`} fill="none" stroke={A} strokeWidth={2} strokeLinecap="round" />
    </g>
  )
}

interface Props {
  taskAt?: number; codeAt?: number; width?: number; height?: number; id?: string
  /** Run on its own: the task lands and the code appears on a timer, no click. */
  auto?: boolean
}

/** A request's execution graph with an agent node in it. On cue the agent's
 *  turn comes: the node pulses and a task lands in the agent's own registry,
 *  in context. On the next, the task's run — discover the service, take the
 *  union of tools and skills, finish. 880 × 720. */
export function RequestGraph({ taskAt = 1, codeAt = 2, auto = false, width = 880, height = 720, id = 'rq' }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const [t, setT] = useState(0)
  useEffect(() => {
    if (!auto) return
    if (reduce) { setT(2); return }
    const a = setTimeout(() => setT(1), 1800)
    const b = setTimeout(() => setT(2), 4200)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [auto, reduce])
  const tasked = auto ? t >= 1 : step >= taskAt
  const coded = auto ? t >= 2 : step >= codeAt
  const gy = 120, gh = 56
  let x = 10
  const xs = NODES.map(n => { const v = x; x += n.w + 30; return v })
  const agent = NODES.findIndex(n => n.agent)
  const ax = xs[agent] + NODES[agent].w / 2
  const path = `${id}-p`
  const cardY = 270, cardH = 132
  const codeY = 450

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: 'visible' }}>
      <text x={10} y={40} fontSize={21} className="dim">{'Request · Đề nghị thanh toán REQ-2291 · execution graph'}</text>
      <path id={path} d={`M ${xs[0]} ${gy + gh / 2} H ${xs[4] + NODES[4].w}`} fill="none" stroke={L} strokeWidth={1.2} />
      {NODES.map((n, i) => (
        <g key={n.label}>
          <rect x={xs[i]} y={gy} width={n.w} height={gh} rx={11} fill="var(--navy-800)" stroke={n.agent ? C : 'var(--line)'} strokeWidth={n.agent ? 1.8 : 1} />
          {n.agent ? <Mark x={xs[i] + 24} y={gy + gh / 2} r={10} /> : n.who ? <Person x={xs[i] + 22} y={gy + gh / 2} /> : null}
          <text x={xs[i] + (n.agent || n.who ? 44 : 18)} y={gy + gh / 2 + 7} fontSize={20} className={n.agent ? 'tone-agent' : undefined}>{n.label}</text>
          {n.who && <text x={xs[i] + n.w / 2} y={gy + gh + 26} fontSize={16} textAnchor="middle" className="dim">{n.who}</text>}
          {n.agent && <text x={xs[i] + n.w / 2} y={gy + gh + 26} fontSize={16} textAnchor="middle" className="tone-agent">{'Grace · agent'}</text>}
        </g>
      ))}
      <Particle path={path} dur={6} begin={-1} tone="blue" r={8} />
      {tasked && !reduce && [0, 1].map(i => (
        <circle key={i} cx={ax} cy={gy + gh / 2} r={30} fill="none" stroke={C} strokeWidth={1.4} opacity={0}>
          <animate attributeName="r" values="30;90" dur="2.6s" begin={`${i * 1.3}s`} repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="2.6s" begin={`${i * 1.3}s`} repeatCount="indefinite" />
        </circle>
      ))}

      {/* the agent's turn: a task lands in its registry, in context */}
      <motion.path d={`M ${ax} ${gy + gh} V ${cardY - 6}`} fill="none" stroke={C} strokeWidth={1.4} strokeDasharray="6 7"
        initial={false} animate={{ pathLength: tasked ? 1 : 0, opacity: tasked ? 1 : 0 }} transition={{ duration: reduce ? 0 : 0.6, ease: 'easeInOut' }} />
      <motion.g initial={false} animate={{ opacity: tasked ? 1 : 0, y: tasked ? 0 : 14 }} transition={{ duration: reduce ? 0 : 0.6, delay: tasked ? 0.4 : 0, ease }}>
        <rect x={10} y={cardY} width={width - 20} height={cardH} rx={12} fill="var(--navy-800)" stroke={C} strokeOpacity={0.6} />
        <text x={34} y={cardY + 34} fontSize={17} className="dim">{'Grace › Tasks · một task xuất hiện — tự động'}</text>
        <Mark x={44} y={cardY + 74} r={12} />
        <text x={70} y={cardY + 70} fontSize={22} style={{ fontWeight: 600 }}>{'Kiểm tra rule · REQ-2291'}</text>
        <text x={70} y={cardY + 98} fontSize={18} className="muted">{'Nguồn: trigger · Context: Requests › Đề nghị thanh toán · Hạn: hôm nay'}</text>
        <rect x={width - 176} y={cardY + 52} width={142} height={34} rx={17} fill="var(--navy-900)" stroke={C} strokeOpacity={0.6} />
        <text x={width - 105} y={cardY + 75} fontSize={17} textAnchor="middle" className="tone-agent">{'đúng context'}</text>
      </motion.g>

      {/* what the run is, once it is in context */}
      <motion.g initial={false} animate={{ opacity: coded ? 1 : 0, y: coded ? 0 : 14 }} transition={{ duration: reduce ? 0 : 0.6, delay: coded ? 0.15 : 0, ease }}>
        <rect x={10} y={codeY} width={width - 20} height={196} rx={12} fill="var(--navy-950)" stroke="var(--line)" />
        <text x={34} y={codeY + 42} fontSize={21} style={{ fontFamily: MONO }}><tspan className="tone-agent">task</tspan>(agent, request):</text>
        <text x={62} y={codeY + 78} fontSize={21} style={{ fontFamily: MONO }}><tspan className="tone-blue">service</tspan> = discover(request)</text>
        <text x={62} y={codeY + 112} fontSize={21} style={{ fontFamily: MONO }}>tools, skills = <tspan className="tone-human">UNION</tspan>(service, agent)</text>
        <text x={62} y={codeY + 146} fontSize={21} style={{ fontFamily: MONO }}>finish(task)</text>
        <text x={width - 34} y={codeY + 180} fontSize={17} textAnchor="end" className="dim">{'giàu hơn một cuộc chat — nó biết service, rules, tools'}</text>
      </motion.g>
      <motion.text x={10} y={height - 14} fontSize={21} className="muted" initial={false} animate={{ opacity: coded ? 1 : 0 }} transition={{ delay: coded ? 0.6 : 0 }}>
        {'giống nhau trong mọi context — một phê duyệt, một lead, một deal, một job'}
      </motion.text>
    </svg>
  )
}
