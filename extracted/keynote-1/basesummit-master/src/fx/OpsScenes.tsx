import { useReducedMotion } from 'motion/react'
import { Particle } from './Particle'

/* Three small scenes for "Agents in ops": as an operator inside flows, on call
   from a comment or a chat, and running on its own schedule. Each is 480×220. */

const C = 'var(--cyan-300)', A = 'var(--amber-300)', L = 'var(--line-strong)'

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

function Pulse({ x, y, r = 12, begin = 0 }: { x: number; y: number; r?: number; begin?: number }) {
  const reduce = useReducedMotion()
  if (reduce) return null
  return (
    <circle cx={x} cy={y} r={r} fill="none" stroke={C} strokeWidth={1.2} opacity={0}>
      <animate attributeName="r" values={`${r};${r * 2.6}`} dur="2.8s" begin={`${begin}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.7;0" dur="2.8s" begin={`${begin}s`} repeatCount="indefinite" />
    </circle>
  )
}

/** A stage box; agent stages are cyan, human ones blue. */
function Stage({ x, y, w, label, agent }: { x: number; y: number; w: number; label: string; agent?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={44} rx={9} fill="var(--navy-800)" stroke={agent ? C : 'var(--line)'} strokeWidth={agent ? 1.6 : 1} />
      {agent && <Mark x={x + 22} y={y + 22} r={9} />}
      <text x={x + (agent ? 40 : 16)} y={y + 28} fontSize={18} className={agent ? 'tone-agent' : undefined}>{label}</text>
    </g>
  )
}

/** As operator: a stage in a workflow, a step in a request flow. */
export function OperatorScene({ id = 'op' }: { id?: string }) {
  const rows: { y: number; kind: string; stages: { label: string; agent?: boolean; w: number }[] }[] = [
    { y: 34, kind: 'Workflow', stages: [{ label: 'Intake', w: 96 }, { label: 'Extract', agent: true, w: 128 }, { label: 'Approve', w: 106 }] },
    { y: 134, kind: 'Request', stages: [{ label: 'Submit', w: 96 }, { label: 'Check', agent: true, w: 128 }, { label: 'Approve', w: 106 }] },
  ]
  return (
    <svg width={480} height={220} viewBox="0 0 480 220" style={{ overflow: 'visible' }}>
      {rows.map((r, i) => {
        let x = 100
        const xs = r.stages.map(s => { const v = x; x += s.w + 26; return v })
        const path = `${id}-${i}`
        const y = r.y + 22
        return (
          <g key={r.kind}>
            <text x={0} y={y + 7} fontSize={19} className="dim">{r.kind}</text>
            <path id={path} d={`M ${xs[0]} ${y} H ${xs[2] + r.stages[2].w}`} fill="none" stroke={L} strokeWidth={1.2} />
            {r.stages.map((s, j) => <Stage key={s.label} x={xs[j]} y={r.y} w={s.w} label={s.label} agent={s.agent} />)}
            <Particle path={path} dur={4} begin={-i * 1.7} tone="blue" r={7} />
          </g>
        )
      })}
    </svg>
  )
}

/** Triggered anywhere: an @ in a comment, a message in chat. */
export function TriggerScene() {
  return (
    <svg width={480} height={220} viewBox="0 0 480 220" style={{ overflow: 'visible' }}>
      {/* a comment on a record */}
      <text x={0} y={22} fontSize={19} className="dim">Comment · INV-2026-0912</text>
      <rect x={0} y={34} width={480} height={62} rx={10} fill="var(--navy-800)" stroke="var(--line)" />
      <circle cx={26} cy={65} r={12} fill={A} />
      <text x={26} y={71} fontSize={13} textAnchor="middle" fill="#051433" style={{ fontWeight: 700 }}>E</text>
      <text x={50} y={60} fontSize={17}>Eric</text>
      <text x={50} y={84} fontSize={17}><tspan className="tone-agent">@Contract Reader</tspan> is the PO on this invoice valid?</text>
      <Pulse x={112} y={79} r={10} begin={0.2} />
      <Mark x={452} y={65} />
      <Pulse x={452} y={65} r={12} begin={1.4} />

      {/* a message in the chat app */}
      <text x={0} y={132} fontSize={19} className="dim">Chat · # deals</text>
      <rect x={0} y={144} width={480} height={62} rx={10} fill="var(--navy-800)" stroke="var(--line)" />
      <circle cx={26} cy={175} r={12} fill="#60A5FA" />
      <text x={26} y={181} fontSize={13} textAnchor="middle" fill="#051433" style={{ fontWeight: 700 }}>D</text>
      <text x={50} y={170} fontSize={17}>Daniel</text>
      <text x={50} y={194} fontSize={17}><tspan className="tone-agent">@Deal copilot</tspan> price Northwind at +12%</text>
      <Pulse x={100} y={189} r={10} begin={0.9} />
      <Mark x={452} y={175} />
      <Pulse x={452} y={175} r={12} begin={2.1} />
    </svg>
  )
}

/** Self-operating: its own tasks, skills, knowledge — and its own schedule. */
export function SelfScene() {
  const reduce = useReducedMotion()
  return (
    <svg width={480} height={220} viewBox="0 0 480 220" style={{ overflow: 'visible' }}>
      <rect x={0} y={0} width={480} height={220} rx={12} fill="var(--navy-800)" stroke="var(--line)" />
      <Mark x={30} y={30} r={12} />
      <text x={52} y={37} fontSize={20}>Data Quality Watch</text>
      <text x={464} y={37} fontSize={16} textAnchor="end" className="dim">agent</text>
      {[['Tasks', '4'], ['Skills', '7'], ['Knowledge', '12']].map(([k, v], i) => (
        <g key={k}>
          <text x={22 + i * 150} y={92} fontSize={30} className="sd">{v}</text>
          <text x={22 + i * 150} y={114} fontSize={16} className="dim">{k}</text>
        </g>
      ))}
      <line x1={22} y1={132} x2={458} y2={132} stroke="var(--line)" />
      {/* clock */}
      <circle cx={40} cy={176} r={18} fill="none" stroke={C} strokeWidth={1.6} />
      <line x1={40} y1={176} x2={40} y2={164} stroke={C} strokeWidth={2} strokeLinecap="round">
        {!reduce && <animateTransform attributeName="transform" type="rotate" from="0 40 176" to="360 40 176" dur="6s" repeatCount="indefinite" />}
      </line>
      <line x1={40} y1={176} x2={48} y2={176} stroke={C} strokeWidth={2} strokeLinecap="round">
        {!reduce && <animateTransform attributeName="transform" type="rotate" from="0 40 176" to="360 40 176" dur="72s" repeatCount="indefinite" />}
      </line>
      <text x={72} y={166} fontSize={17}>Nightly sweep <tspan className="dim">· every day, 02:00</tspan></text>
      <text x={72} y={192} fontSize={17}>Weekly recap <tspan className="dim">· Mondays, 08:00</tspan></text>
      <text x={464} y={166} fontSize={15} textAnchor="end" className="tone-agent">next in 4h 12m</text>
    </svg>
  )
}
