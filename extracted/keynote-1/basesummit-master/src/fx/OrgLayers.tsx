import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'
import { useStep } from '../engine/step'
import type { Tone } from './Particle'

const ease = [0.2, 0.8, 0.2, 1] as const
const LINE = 'var(--line-strong)', RAISED = 'var(--navy-800)', DEEP = 'var(--navy-950)'
const B = 'var(--blue-300)', B4 = 'var(--blue-400)', C = 'var(--cyan-300)', AM = 'var(--amber-300)'

/** A 1640-wide figure — the width the stage gives a stack figure at 2:1, so
 *  nothing is scaled. The organisation is drawn in the left 800px as four
 *  layers; the four readings stand numbered in a column from COL, under the
 *  question. */
const W = 1640, H = 560, COL = 930
/** 01 — services: six circles in two rows of three (Eric, 2026-09-12: three
 *  per row, so the circles can be big), each wearing its operating standard
 *  as a gauge. The bottom row runs right to left, so the order-to-cash
 *  story reads as one clockwise cycle: Sales hands straight down to
 *  Delivery, and Support closes the loop back up to Recruiting. */
const CX0 = 190, CPITCH = 240, RY = [140, 340], NR = 70, GR = 78
interface Service { label: string; std: number }
const services: Service[] = [
  { label: 'Recruiting', std: 0.64 }, { label: 'Product', std: 0.88 }, { label: 'Sales', std: 0.92 },
  { label: 'Support', std: 0.7 }, { label: 'Payments', std: 0.85 }, { label: 'Delivery', std: 0.78 },
]
interface Pt { x: number; y: number }
const center = (i: number): Pt => ({ x: CX0 + (i % 3) * CPITCH, y: RY[Math.floor(i / 3)] })
const rad = (deg: number) => (deg * Math.PI) / 180
/** The gauge: an arc from the top of the node, clockwise, `std` of the way round. */
const gaugeEnd = (i: number): Pt => {
  const { x, y } = center(i), end = rad(-90 + 360 * services[i].std)
  return { x: x + GR * Math.cos(end), y: y + GR * Math.sin(end) }
}
const gauge = (i: number) => {
  const { x, y } = center(i), e = gaugeEnd(i)
  return `M ${x} ${y - GR} A ${GR} ${GR} 0 ${services[i].std > 0.5 ? 1 : 0} 1 ${e.x} ${e.y}`
}
/** 02 — workforce: each service's team inside its circle. The title sits
 *  alone in the middle until the team arrives, then slides up TSHIFT so the
 *  two are centred together; the badges sit PY below the centre. */
const PR = 14, PP = 21, TSHIFT = 17, PY = 17
const people: (string | null)[][] = [
  [B, null], [C], [B, C, null],
  [C, B], [B, null], [B, C],
]
/** 03 — coordination: a ring of flows running clockwise round the grid —
 *  over the top row, down the right side, under the bottom row, up the left
 *  — and two cross-links in the agent's tone from Product down to the
 *  bottom corners, each end facing the other, bowed away from the circle
 *  between so the pair reads as a wishbone. */
type Kind = 'over' | 'under' | 'right' | 'left' | 'across'
interface Arc { from: number; to: number; kind: Kind; h: number; tone: Tone }
const arcs: Arc[] = [
  // the ring, clockwise from Recruiting
  { from: 0, to: 1, kind: 'over', h: 44, tone: 'blue' }, { from: 1, to: 2, kind: 'over', h: 44, tone: 'blue' },
  { from: 2, to: 5, kind: 'right', h: 60, tone: 'blue' },
  { from: 5, to: 4, kind: 'under', h: 44, tone: 'blue' }, { from: 4, to: 3, kind: 'under', h: 44, tone: 'blue' },
  { from: 3, to: 0, kind: 'left', h: 60, tone: 'blue' },
  // the cross-links: what the product knows, straight to delivery and support
  { from: 1, to: 3, kind: 'across', h: 22, tone: 'cyan' }, { from: 1, to: 5, kind: 'across', h: -22, tone: 'cyan' },
]
/** Flows meet a circle just outside its gauge ring. */
const AR = GR + 5
const anchor = (c: Pt, deg: number): Pt => ({ x: c.x + AR * Math.cos(rad(deg)), y: c.y + AR * Math.sin(rad(deg)) })
const arcGeom = (a: Arc) => {
  const p = center(a.from), q = center(a.to)
  let a0 = 0, a1 = 0, bx = 0, by = 0
  switch (a.kind) {
    case 'over': a0 = a1 = -90; by = -a.h; break
    case 'under': a0 = a1 = 90; by = a.h; break
    case 'right': a0 = a1 = 0; bx = a.h; break
    case 'left': a0 = a1 = 180; bx = -a.h; break
    case 'across': {
      const dx = q.x - p.x, dy = q.y - p.y, len = Math.hypot(dx, dy)
      a0 = (Math.atan2(dy, dx) * 180) / Math.PI; a1 = a0 + 180
      bx = (-dy / len) * a.h; by = (dx / len) * a.h
    }
  }
  const s = anchor(p, a0), e = anchor(q, a1)
  return { s, e, d: `M ${s.x} ${s.y} C ${s.x + bx} ${s.y + by}, ${e.x + bx} ${e.y + by}, ${e.x} ${e.y}` }
}
const tone = (t: Tone) => (t === 'cyan' ? C : B)
/** 04 — rules: the slab everything stands on, a ruler's ticks along its top. */
const SX = CX0 - GR - 6, SW = center(5).x + GR + 6 - SX, SY = 490
const slab: [string, (x: number, y: number) => ReactNode][] = [
  ['Rules', (x, y) => <path d={`M ${x} ${y + 4} h 16 M ${x} ${y + 11} h 12 M ${x} ${y + 18} h 8`} stroke={B} strokeWidth={2} strokeLinecap="round" fill="none" />],
  ['Policies', (x, y) => <><circle cx={x + 10} cy={y + 11} r={9} stroke={B} strokeWidth={2} fill="none" /><path d={`M ${x + 5.5} ${y + 11} l 3.5 3.5 l 6.5 -7`} stroke={B} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" /></>],
  ['Knowledge', (x, y) => <path d={`M ${x + 10} ${y + 5} Q ${x + 5} ${y + 2} ${x} ${y + 4} V ${y + 19} Q ${x + 5} ${y + 17} ${x + 10} ${y + 20} Q ${x + 15} ${y + 17} ${x + 20} ${y + 19} V ${y + 4} Q ${x + 15} ${y + 2} ${x + 10} ${y + 5} V ${y + 20}`} stroke={B} strokeWidth={2} strokeLinejoin="round" fill="none" />],
]

/** The four readings, one per layer. Asterisks mark the phrase the layer is named for.
 *  The headword is the English term itself, so there is no gloss. */
interface Reading { word: string; gloss: string | null; lines: string[] }
const readings: Reading[] = [
  { word: 'Service', gloss: null, lines: ['A system of *services*, each with operating standards', 'that are optimized over time'] },
  { word: 'Workforce', gloss: null, lines: ['A *workforce* with the skills it takes', 'to get the work done'] },
  { word: 'Coordination', gloss: null, lines: ['An effective mode of *coordination*, so that we can', 'work in parallel, across departments, continuously'] },
  { word: 'Rules', gloss: null, lines: ['A set of *rules*, policies and knowledge', 'to make sure things are done right and done well'] },
]
const em = (line: string) => line.split('*').map((s, i) => (i % 2 ? <tspan key={i} className="tone-blue">{s}</tspan> : s))

const MID = (RY[0] + RY[1]) / 2
/** The question: Q_BIG alone in the middle of the figure before the first
 *  click, then Q_SMALL at the head of the readings column. Under it the
 *  readings stand in translucent boxes READ_H tall, READ_GAP apart, from
 *  READ_Y0 — four of them end at 550, inside the figure's 560. The question
 *  sits Q_TOP, a little above the figure, so ~36px part it from the first box. */
const Q_BIG = 76, Q_SMALL = 32, Q_TOP = -14, READ_Y0 = 60, READ_H = 115, READ_GAP = 10
const BOX_FILL = 'color-mix(in srgb, var(--blue-300) 7%, transparent)'
const BOX_LINE = 'color-mix(in srgb, var(--blue-300) 14%, transparent)'

/** A person as a badge: a ring in the human tone around a silhouette, a skill
 *  dot on the shoulder when they bring one. */
function Person({ x, y, skill }: { x: number; y: number; skill: string | null }) {
  const k = PR / 12
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={PR} fill={DEEP} stroke={AM} strokeOpacity={0.6} strokeWidth={1.2} />
      <g transform={`scale(${k})`}>
        <circle cy={-3} r={3.8} fill={AM} />
        <path d="M -6.5 8 a 6.5 6.5 0 0 1 13 0 Z" fill={AM} />
        {skill && <circle cx={8.5} cy={8} r={3.6} fill={skill} stroke={DEEP} strokeWidth={1.5} />}
      </g>
    </g>
  )
}

interface Props {
  id?: string
  /** Asked before the first layer: centred on its own at step 0, then moved
   *  up over the readings column. */
  question?: ReactNode
}

/** An organisation assembled from first principles, one click per layer: six
 *  services in two rows of three, each a circle wearing its operating standard
 *  as a gauge that has climbed round it; the workforce as a team of person
 *  badges inside each circle, skills on their shoulders, the title sliding up
 *  to make room; coordination as a ring of flows running clockwise round the
 *  grid and two cross-links through the gap between the rows, dashed, the
 *  dashes marching towards an arrowhead at the destination; and the slab of
 *  rules everything stands on, a ruler's
 *  ticks along its top. Each layer's reading stands, numbered, in the column
 *  beside the drawing. */
export function OrgLayers({ id = 'ol', question }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const d = (s: number) => (reduce ? 0 : s)
  const on = (n: number) => step >= n
  const layer = (n: number, delay = 0, dy = 16) => ({
    initial: false as const,
    animate: { opacity: on(n) ? 1 : 0, y: on(n) ? 0 : dy },
    transition: { duration: d(0.7), delay: on(n) ? d(delay) : 0, ease },
  })
  const draw = (n: number, delay = 0, dur = 0.8) => ({
    initial: false as const,
    animate: { pathLength: on(n) ? 1 : 0, opacity: on(n) ? 1 : 0 },
    transition: { duration: d(dur), delay: on(n) ? d(delay) : 0, ease: 'easeInOut' as const },
  })

  return (
    <div style={{ position: 'relative', width: W, height: H }}>
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      {/* The halo brightens as the organisation fills in. */}
      <motion.circle cx={center(1).x} cy={MID} r={360} fill="url(#halo-blue)" initial={false}
        animate={{ opacity: on(1) ? 0.4 + step * 0.15 : 0 }} transition={{ duration: d(1.2), ease }} />

      {/* 01 — services: circles in two rows, each with its standard climbing round it. */}
      {services.map((s, i) => {
        const { x, y } = center(i), e = gaugeEnd(i)
        return (
          <motion.g key={i} initial={false} style={{ transformOrigin: `${x}px ${y}px` }}
            animate={{ opacity: on(1) ? 1 : 0, scale: on(1) ? 1 : 0.6 }}
            transition={{ duration: d(0.7), delay: on(1) ? d(0.06 + i * 0.09) : 0, ease }}>
            <circle cx={x} cy={y} r={GR} fill="none" stroke={LINE} strokeWidth={1} strokeOpacity={0.7} />
            {/* The gauge keeps turning round its node — the dot leading, the arc trailing — each at its own pace. */}
            <g>
              <motion.path d={gauge(i)} fill="none" stroke={B} strokeWidth={3} strokeLinecap="round" {...draw(1, 0.5 + i * 0.09, 1.1)} />
              <motion.circle cx={e.x} cy={e.y} r={4} fill={C} initial={false}
                animate={{ opacity: on(1) ? 1 : 0 }} transition={{ duration: d(0.3), delay: on(1) ? d(1.5 + i * 0.09) : 0 }}>
                {!reduce && <animate attributeName="r" values="3.5;5;3.5" dur="2.6s" begin={`${i * 0.4}s`} repeatCount="indefinite" />}
              </motion.circle>
              {!reduce && <animateTransform attributeName="transform" type="rotate" from={`${i * 60} ${x} ${y}`} to={`${i * 60 + 360} ${x} ${y}`} dur={`${9 + (i % 3) * 2}s`} repeatCount="indefinite" />}
            </g>
            <circle cx={x} cy={y} r={NR} fill={RAISED} stroke={LINE} />
            {/* Alone in the middle; slides up when the team arrives, so title and team are centred together. */}
            <motion.text x={x} y={y + 7} textAnchor="middle" fontSize={19} className="sd" initial={false}
              animate={{ y: on(2) ? -TSHIFT : 0 }} transition={{ duration: d(0.6), delay: on(2) ? d(0.05 + i * 0.08) : 0, ease }}>
              {s.label}
            </motion.text>
          </motion.g>
        )
      })}

      {/* 02 — workforce: each service's team inside its circle, skills on their shoulders. */}
      {people.map((team, i) => {
        const { x, y } = center(i)
        return (
          <motion.g key={i} initial={false} animate={{ opacity: on(2) ? 1 : 0, y: on(2) ? 0 : 10 }}
            transition={{ duration: d(0.6), delay: on(2) ? d(0.05 + i * 0.08) : 0, ease }}>
            {team.map((sk, k) => <Person key={k} x={x + (k - (team.length - 1) / 2) * PP} y={y + PY} skill={sk} />)}
          </motion.g>
        )
      })}

      {/* 03 — coordination: dashed flows from one service to the next, the dashes marching towards an
          arrowhead at the destination; a dot marks where each flow starts. */}
      <defs>
        {(['blue', 'cyan'] as Tone[]).map(t => (
          <marker key={t} id={`${id}-head-${t}`} markerUnits="userSpaceOnUse" markerWidth={12} markerHeight={10} refX={12} refY={5} orient="auto">
            <path d="M 0 0 L 12 5 L 0 10 L 3 5 Z" fill={tone(t)} />
          </marker>
        ))}
      </defs>
      {arcs.map((a, i) => {
        const g = arcGeom(a), stroke = tone(a.tone)
        return (
          <motion.g key={i} initial={false} animate={{ opacity: on(3) ? 1 : 0 }} transition={{ duration: d(0.6), delay: on(3) ? d(0.1 + i * 0.1) : 0, ease }}>
            <path d={g.d} fill="none" stroke={stroke} strokeWidth={2} strokeOpacity={0.9} strokeDasharray="7 7" markerEnd={`url(#${id}-head-${a.tone})`}>
              {/* A falling offset walks the dashes forward, the way the work flows. */}
              {!reduce && <animate attributeName="stroke-dashoffset" from="0" to="-14" dur={`${0.9 + (i % 3) * 0.15}s`} repeatCount="indefinite" />}
            </path>
            <circle cx={g.s.x} cy={g.s.y} r={3.2} fill={stroke} />
          </motion.g>
        )
      })}
      {/* 04 — rules: the slab everything stands on, ticks along its top like a ruler. */}
      <motion.g {...layer(4, 0.05, 20)}>
        {/* No box — just the hairline along its top. */}
        <line x1={SX} x2={SX + SW} y1={SY} y2={SY} stroke={LINE} />
        {/* The ticks grow along the slab by their far end — a path-length draw would replace the dash pattern. */}
        <motion.line x1={SX + 18} y1={SY + 9} y2={SY + 9} stroke={B4} strokeWidth={7} strokeOpacity={0.7} strokeDasharray="1.5 10.5"
          initial={false} animate={{ x2: on(4) ? SX + SW - 18 : SX + 18 }} transition={{ duration: d(1.4), delay: on(4) ? d(0.3) : 0, ease: 'easeInOut' }} />
        {slab.map(([label, glyph], i) => {
          const x = SX + SW * ((2 * i + 1) / 6) - 60, gy = SY + 22
          return (
            <motion.g key={i} initial={false} animate={{ opacity: on(4) ? 1 : 0 }} transition={{ duration: d(0.5), delay: on(4) ? d(0.6 + i * 0.12) : 0 }}>
              {glyph(x, gy)}
              <text x={x + 32} y={gy + 18} fontSize={21}>{label}</text>
            </motion.g>
          )
        })}
      </motion.g>

      {/* The readings, one per layer, each in a translucent box across the column. */}
      {readings.map((r, i) => {
        const y0 = READ_Y0 + i * (READ_H + READ_GAP), gloss = r.gloss
        return (
          <motion.g key={i} {...layer(i + 1, 0.15)}>
            <rect x={COL} y={y0} width={W - COL} height={READ_H} rx={14} style={{ fill: BOX_FILL, stroke: BOX_LINE }} />
            <text x={COL + 24} y={y0 + 36} fontSize={18} className="sd dim">0{i + 1}</text>
            <text x={COL + 68} y={y0 + 36}>
              <tspan fontSize={28} className="sd">{r.word}</tspan>
              {gloss && <tspan fontSize={20} className="dim" dx={12}>{gloss}</tspan>}
            </text>
            {r.lines.map((line, k) => (
              <text key={k} x={COL + 68} y={y0 + 68 + k * 27} fontSize={22}>{em(line)}</text>
            ))}
          </motion.g>
        )
      })}
    </svg>
      {/* The question: alone in the middle until the first click, then up at the head of the readings. */}
      {question && (
        <motion.div initial={false}
          style={{ position: 'absolute', whiteSpace: 'nowrap', fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.15, color: 'var(--white)' }}
          animate={on(1)
            ? { left: COL, top: Q_TOP, x: '0%', y: '0%', fontSize: Q_SMALL }
            : { left: W / 2, top: H / 2, x: '-50%', y: '-50%', fontSize: Q_BIG }}
          transition={{ duration: d(0.9), ease }}>
          {question}
        </motion.div>
      )}
    </div>
  )
}
