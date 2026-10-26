import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'
import { Particle } from './Particle'

const ease = [0.2, 0.8, 0.2, 1] as const
const LINE = 'var(--line-strong)', RAISED = 'var(--navy-800)', DEEP = 'var(--navy-950)'
const B4 = 'var(--blue-400)', B5 = 'var(--blue-500)', C = 'var(--cyan-300)'
const MONO = 'ui-monospace, SFMono-Regular, Consolas, monospace'

/** A 1640 × 500 figure in three zones. Left, the unit: one Service, its five
 *  declared parts and the handle each is discoverable by. Right, the three
 *  checks the unit passes — what SOA asked, what Model and Context asked, what
 *  first principles asked. Beneath, how units compose: a Service Flow whose
 *  vertices are services. */
const W = 1640, H = 500
/** Zone A — the unit. */
const AW = 620, AY = 20, AH = 460
/** The part names and handles are new.rework.com/architecture's. */
interface Part { n: string; term: string; desc: string; code: string }
const parts: Part[] = [
  { n: '01', term: 'Operational object', desc: 'One object, one clear lifecycle', code: 'getServiceObjectSchema(service_id)' },
  { n: '02', term: 'Operator', desc: 'Who operates it — Human · Agent. ⟨operator, service_id⟩ = job duties.', code: 'getServiceOperatorModel(service_id)' },
  { n: '03', term: 'Explicit purpose', desc: 'An explicit goal. Sales → win deals.', code: 'service = verb + operational_object' },
  { n: '04', term: 'SOP · Actions', desc: 'Actions, conditions, parameters — agents can execute them.', code: 'getServiceActions(service_id)' },
  { n: '05', term: 'Persistent & durable', desc: 'Every business operation must be service-able.', code: '∀ business_op → service-able' },
]
const ROW0 = AY + 112, PITCH = 66
const props3 = ['Declarative', 'Operation-centric', 'Modular']
const lifecycle: [string, number][] = [['New', 44], ['In progress', 88], ['Done', 72]]
/** Zone B — the checks. */
const BX = 680
/** A line is plain text, or a lead-in followed by the struck-through words it replaces. */
type Line = string | (string | string[])[]
interface Check { title: string; lines: Line[] }
const checks: Check[] = [
  { title: 'SOA', lines: ['Modular · Interface-driven · Autonomous', 'Modular outside, optimized inside · declared I/O contract · evolves independently'] },
  { title: 'Model & Context', lines: [
    ['Model: one model, stable and explicit — instead of', ['Unstable', 'Fragmented', 'Hidden & Ad hoc']],
    ['Context: Purpose-driven · Discoverable — instead of', ['UI-first', 'Made for human']],
  ] },
  { title: 'First principle thinking', lines: [
    '01 Services → Service · 02 Workforce → Operator',
    '03 Coordination → Service Flow · 04 Rules → SOP, declared',
  ] },
]
const checkY = (i: number) => 64 + i * 86
/** Zone C — composition: services become the vertices of one process. */
const CY = 332, FW = 120, FH = 38
const flowNodes: [string, number, number][] = [['Lead', 690, 44], ['Pipeline', 940, 44], ['Quote', 1190, 14], ['Contract', 1190, 74], ['Invoice', 1440, 44]]
const flowLinks: [number, number][] = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 4]]
const ncy = (k: number) => CY + flowNodes[k][2] + FH / 2
const link = (ax: number, ay: number, bx: number, by: number) => `C ${ax + 70} ${ay}, ${bx - 70} ${by}, ${bx} ${by}`
/** A meteor's road through the flow: node centre to node centre, along the connectors. */
const road = (seq: number[]) => seq.map((k, i) => {
  const x = flowNodes[k][1], y = ncy(k)
  if (i === 0) return `M ${x + FW / 2} ${y} L ${x + FW} ${y}`
  const px = flowNodes[seq[i - 1]][1] + FW, py = ncy(seq[i - 1])
  return `${link(px, py, x, y)} L ${i === seq.length - 1 ? x + FW / 2 : x + FW} ${y}`
}).join(' ')

interface Props { id?: string }

export function ServiceAnswer({ id = 'sa' }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const d = (s: number) => (reduce ? 0 : s)
  const on = (n: number) => step >= n
  const layer = (n: number, delay = 0, dy = 14) => ({
    initial: false as const,
    animate: { opacity: on(n) ? 1 : 0, y: on(n) ? 0 : dy },
    transition: { duration: d(0.7), delay: on(n) ? d(delay) : 0, ease },
  })
  const draw = (n: number, delay = 0, dur = 0.8) => ({
    initial: false as const,
    animate: { pathLength: on(n) ? 1 : 0, opacity: on(n) ? 1 : 0 },
    transition: { duration: d(dur), delay: on(n) ? d(delay) : 0, ease: 'easeInOut' as const },
  })
  const pillW = (s: string, w = 7.4) => Math.round(s.length * w) + 22

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      <motion.circle cx={AW / 2} cy={AY + AH / 2} r={360} fill="url(#halo-blue)" initial={false}
        animate={{ opacity: 0.5 + step * 0.16 }} transition={{ duration: d(1.2), ease }} />

      {/* Zone A — the unit, on arrival. */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: d(0.6) }}>
        <rect x={0} y={AY} width={AW} height={AH} rx={16} fill={RAISED} stroke={B5} strokeOpacity={0.7} />
        <text x={22} y={AY + 44} fontSize={30} className="sd">Service</text>
        <text x={22} y={AY + 68} fontSize={15} className="dim">{'A declarative unit of operation — everything discoverable from one service_id'}</text>
        {(() => { const sid = 'service_id: sales', w = pillW(sid, 7.8); return (
          <g>
            <rect x={AW - 20 - w} y={AY + 24} width={w} height={26} rx={13} fill={DEEP} stroke={B4} strokeOpacity={0.7} />
            <text x={AW - 20 - w / 2} y={AY + 41} textAnchor="middle" fontSize={13} fontFamily={MONO} className="tone-blue">{sid}</text>
          </g>
        ) })()}
        {(() => { let x = 22; return props3.map(p => { const w = pillW(p, 7.6), px = x; x += w + 8; return (
          <g key={p}>
            <rect x={px} y={AY + 84} width={w} height={22} rx={11} fill={B5} fillOpacity={0.18} stroke={B4} strokeOpacity={0.6} />
            <text x={px + w / 2} y={AY + 99} textAnchor="middle" fontSize={13} className="tone-blue">{p}</text>
          </g>
        ) }) })()}
        <line x1={0} y1={ROW0 - 12} x2={AW} y2={ROW0 - 12} stroke={LINE} />
      </motion.g>
      {parts.map((p, i) => {
        const ry = ROW0 + i * PITCH, w = pillW(p.code)
        return (
          <motion.g key={p.n} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: d(0.6), delay: d(0.25 + i * 0.1), ease }}>
            <text x={22} y={ry + 22} fontSize={13} fontFamily={MONO} className="dim">{p.n}</text>
            <text x={58} y={ry + 23} fontSize={20} className="sd">{p.term}</text>
            <text x={58} y={ry + 46} fontSize={15} className="muted">{p.desc}</text>
            <rect x={AW - 20 - w} y={ry + 5} width={w} height={24} rx={12} fill={DEEP} stroke={LINE} />
            <text x={AW - 20 - w / 2} y={ry + 21} textAnchor="middle" fontSize={12.5} fontFamily={MONO} className="tone-blue">{p.code}</text>
            {i === 0 && (() => {
              // the lifecycle the object moves through, a dot forever making its way along it
              let x = 340
              const chips = lifecycle.map(([l, cw]) => { const cx = x; x += cw + 24; return [l, cx, cw] as [string, number, number] })
              return (
                <g>
                  <line x1={chips[0][1]} y1={ry + 41} x2={x - 24} y2={ry + 41} stroke={LINE} />
                  {!reduce && <circle cy={ry + 41} r={3.5} fill={C}>
                    <animate attributeName="cx" values={`${chips[0][1] + 8};${x - 32}`} dur="5s" repeatCount="indefinite" calcMode="spline" keySplines="0.4 0 0.6 1" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="5s" repeatCount="indefinite" />
                  </circle>}
                  {chips.map(([l, cx, cw]) => (
                    <g key={l}>
                      <rect x={cx} y={ry + 32} width={cw} height={18} rx={9} fill={DEEP} stroke={LINE} />
                      <text x={cx + cw / 2} y={ry + 45} textAnchor="middle" fontSize={11} className="muted">{l}</text>
                    </g>
                  ))}
                </g>
              )
            })()}
          </motion.g>
        )
      })}

      {/* Zone B — the checks the unit passes, fanned out of it. */}
      {checks.map((c, i) => {
        const cy = checkY(i) + 10
        const path = `M ${AW} ${AY + AH / 2} C ${AW + 30} ${AY + AH / 2}, ${BX - 40} ${cy}, ${BX - 4} ${cy}`
        return (
          <g key={i}>
            <motion.path d={path} fill="none" stroke={B4} strokeWidth={1.2} strokeOpacity={0.7} {...draw(1, 0.1 + i * 0.1, 0.7)} />
            <motion.g {...layer(1, 0.45 + i * 0.12)}>
              <circle cx={BX + 11} cy={cy} r={11} fill={DEEP} stroke={B4} />
              <motion.path d={`M ${BX + 6} ${cy} l 3.5 3.5 l 7 -7.5`} fill="none" stroke={C} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...draw(1, 0.8 + i * 0.12, 0.4)} />
              <text x={BX + 34} y={cy + 8} fontSize={22} className="sd">{c.title}</text>
              {c.lines.map((copy, k) => { const line = copy; return (
                <text key={k} x={BX + 34} y={cy + 34 + k * 23} fontSize={16} className={k === 0 && typeof line === 'string' ? 'tone-blue' : undefined}>
                  {typeof line === 'string' ? line : (
                    <>
                      <tspan className="muted">{line[0] as string}</tspan>
                      {(line[1] as string[]).map((g, j) => <tspan key={g} className="dim" textDecoration="line-through" dx={j ? 10 : 6}>{g}</tspan>)}
                    </>
                  )}
                </text>
              ) })}
            </motion.g>
          </g>
        )
      })}

      {/* Zone C — one unit becomes a process: services are the vertices, the flow joins them, meteors run each branch beneath the nodes. */}
      <motion.g {...layer(2, 0)}>
        <text x={BX} y={CY} fontSize={14} className="tone-blue">{'Service Flow · cross-department coordination — each service is a vertex, the flow connects them'}</text>
        <text x={BX} y={CY + 140} fontSize={13} fontFamily={MONO} className="dim">{'primary_object: ServiceLog — every step recorded · a flow is a service too'}</text>
        {flowLinks.map(([a, b]) => (
          <motion.path key={`${a}${b}`} d={`M ${flowNodes[a][1] + FW} ${ncy(a)} ${link(flowNodes[a][1] + FW, ncy(a), flowNodes[b][1], ncy(b))}`}
            fill="none" stroke={LINE} strokeWidth={1.2} {...draw(2, 0.4, 0.7)} />
        ))}
        <path id={`${id}-roadA`} d={road([0, 1, 2, 4])} fill="none" stroke="none" />
        <path id={`${id}-roadB`} d={road([0, 1, 3, 4])} fill="none" stroke="none" />
        {on(2) && <Particle path={`${id}-roadA`} dur={4.2} begin={1.3} r={3} tail={34} tone="blue" />}
        {on(2) && <Particle path={`${id}-roadB`} dur={5} begin={2.6} r={3} tail={34} tone="cyan" />}
        {flowNodes.map(([l, x, y], k) => (
          <motion.g key={k} initial={false} animate={{ opacity: on(2) ? 1 : 0, scale: on(2) ? 1 : 0.8 }} style={{ transformOrigin: `${x + FW / 2}px ${CY + y + FH / 2}px` }}
            transition={{ duration: d(0.5), delay: on(2) ? d(0.15 + k * 0.1) : 0, ease }}>
            <rect x={x} y={CY + y} width={FW} height={FH} rx={11} fill={RAISED} stroke={B5} strokeOpacity={0.7} />
            <text x={x + FW / 2} y={CY + y + 25} textAnchor="middle" fontSize={15}>{l}</text>
          </motion.g>
        ))}
      </motion.g>
    </svg>
  )
}
