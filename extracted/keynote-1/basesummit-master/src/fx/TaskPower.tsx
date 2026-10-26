import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'
import { Particle } from './Particle'

/* An 880×500 scene for the split layout. One task in the middle; who it can be
 * assigned to beneath it; the plan that aligns it above. */
const W = 880, H = 500
const CARD_W = 272, CARD_H = 76, CARD_Y = 200
const CARD_X = [0, 304, 608]
const MAIN = 1
const TGT_Y = 400, TGT_H = 80
const CHIP_Y = 24, CHIP_H = 48
const ease = [0.2, 0.8, 0.2, 1] as const
const A = 'var(--amber-300)'

type OwnerKind = 'person' | 'team' | 'unit'

const CARDS: { code: string; name: string; owner: { kind: OwnerKind; label: string } | null }[] = [
  { code: 'WR-1198', name: 'Hire the branch team', owner: { kind: 'team', label: 'People team' } },
  { code: 'WR-1204', name: 'Fit out the office', owner: null },
  { code: 'WR-1210', name: 'Move the sales desk', owner: { kind: 'unit', label: 'HCMC branch' } },
]

/* The assignee picker's real choice set: a user, a team (with a DRI), an org unit. */
const TARGETS: { kind: OwnerKind; name: string; sub: string; w: number; cx: number; at: number }[] = [
  { kind: 'person', name: 'Daniel', sub: 'Facilities', w: 200, cx: 130, at: 0 },
  { kind: 'team', name: 'Facilities team', sub: 'DRI · Jane', w: 270, cx: 440, at: 1 },
  { kind: 'unit', name: 'HCMC branch', sub: '4 teams · 38 people', w: 260, cx: 745, at: 1 },
]

/* A plan chain: objective → initiative. The initiative links down to the work. */
const PLAN = ['Expansion 2026', 'Open the HCMC branch']
const chipW = (s: string) => Math.max(180, s.length * 12.5 + 40)

/* ── Owner glyphs, all in the human colour ─────────────────────────────── */
function Person({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={-7} r={5.5} fill={A} />
      <path d="M -10 11 q 10 -15 20 0" fill="none" stroke={A} strokeWidth={2.4} strokeLinecap="round" />
    </g>
  )
}
function Team({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Person x={-13} y={2} s={0.75} />
      <Person x={13} y={2} s={0.75} />
      <Person x={0} y={-2} s={0.9} />
    </g>
  )
}
function Unit({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} stroke={A} strokeWidth={2} fill="none" strokeLinecap="round">
      <rect x={-6} y={-14} width={12} height={8} rx={2} />
      <path d="M 0 -6 v 6 M -12 0 h 24 M -12 0 v 6 M 0 0 v 6 M 12 0 v 6" />
      <rect x={-18} y={6} width={12} height={8} rx={2} />
      <rect x={-6} y={6} width={12} height={8} rx={2} />
      <rect x={6} y={6} width={12} height={8} rx={2} />
    </g>
  )
}
function Glyph({ kind, x, y, s }: { kind: OwnerKind; x: number; y: number; s?: number }) {
  if (kind === 'person') return <Person x={x} y={y} s={s} />
  if (kind === 'team') return <Team x={x} y={y} s={s} />
  return <Unit x={x} y={y} s={s} />
}

/* An assignment line that draws in, then carries one dot from the task to its
 * owner. The dot rides an invisible twin path, so it never runs ahead of the
 * drawing stroke, and both twins move when the owner moves. */
function AssignLine({ id, d, on, delay }: { id: string; d: string; on: boolean; delay: number }) {
  const reduce = useReducedMotion()
  const [drawn, setDrawn] = useState(false)
  useEffect(() => { if (!on) setDrawn(false) }, [on])
  return (
    <g>
      <motion.path
        d={d} fill="none" stroke="var(--line-strong)" strokeWidth={1.3}
        initial={false}
        animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0, d }}
        transition={{
          pathLength: { duration: reduce ? 0 : 0.7, delay: on ? delay : 0, ease: 'easeInOut' },
          opacity: { duration: 0.3, delay: on ? delay : 0 },
          d: { duration: reduce ? 0 : 0.6, ease },
        }}
        onAnimationComplete={() => { if (on) setDrawn(true) }}
      />
      <motion.path id={id} d={d} fill="none" stroke="none" initial={false} animate={{ d }} transition={{ duration: reduce ? 0 : 0.6, ease }} />
      {on && (drawn || reduce) && <Particle path={id} dur={2.6} tone="blue" r={7} />}
    </g>
  )
}

export function TaskPower() {
  const step = useStep()
  const reduce = useReducedMotion()
  const dur = reduce ? 0 : 0.6
  const fan = step >= 1
  const planOn = step >= 2

  const mainCx = CARD_X[MAIN] + CARD_W / 2
  const tgtCx = (t: typeof TARGETS[number]) => (t.kind === 'person' && !fan ? mainCx : t.cx)
  const lineD = (cx: number) =>
    `M ${mainCx} ${CARD_Y + CARD_H} C ${mainCx} ${CARD_Y + CARD_H + 64}, ${cx} ${TGT_Y - 64}, ${cx} ${TGT_Y}`

  // Plan chain, centred over the row of cards.
  const ws = PLAN.map(chipW)
  const total = ws.reduce((a, b) => a + b, 0) + 56 * (PLAN.length - 1)
  let cx0 = (W - total) / 2
  const chips = PLAN.map((label, i) => { const c = { label, x: cx0, w: ws[i] }; cx0 += ws[i] + 56; return c })
  const last = chips[chips.length - 1]
  const lastCx = last.x + last.w / 2
  const linkD = (cx: number) =>
    `M ${lastCx} ${CHIP_Y + CHIP_H} C ${lastCx} ${CHIP_Y + CHIP_H + 60}, ${cx} ${CARD_Y - 60}, ${cx} ${CARD_Y}`

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      {/* Plan chain */}
      {chips.map((c, i) => {
        const isLast = i === chips.length - 1
        return (
          <motion.g key={c.label} initial={false} animate={{ opacity: planOn ? 1 : 0, y: planOn ? 0 : -12 }}
            transition={{ duration: dur, delay: planOn ? i * 0.18 : 0, ease }}>
            <rect x={c.x} y={CHIP_Y} width={c.w} height={CHIP_H} rx={24}
              fill={isLast ? 'var(--navy-700)' : 'transparent'} stroke={isLast ? 'var(--blue-300)' : 'var(--line-strong)'} />
            <text x={c.x + c.w / 2} y={CHIP_Y + 31} textAnchor="middle" fontSize={22} className={isLast ? undefined : 'muted'}>{c.label}</text>
            {!isLast && (
              <line x1={c.x + c.w + 6} x2={c.x + c.w + 50} y1={CHIP_Y + CHIP_H / 2} y2={CHIP_Y + CHIP_H / 2} stroke="var(--line-strong)" strokeWidth={1.2} />
            )}
          </motion.g>
        )
      })}

      {/* Plan → work links */}
      {CARDS.map((c, i) => (
        <motion.path key={c.code} d={linkD(CARD_X[i] + CARD_W / 2)} fill="none" stroke="var(--blue-300)" strokeWidth={1.4} strokeDasharray="4 7"
          initial={false} animate={{ pathLength: planOn ? 1 : 0, opacity: planOn ? 1 : 0 }}
          transition={{ duration: reduce ? 0 : 0.8, delay: planOn ? 0.5 + i * 0.15 : 0, ease: 'easeInOut' }} />
      ))}

      {/* Work requests: the main one from the start, its siblings with the plan */}
      {CARDS.map((c, i) => {
        const main = i === MAIN
        const on = main || planOn
        const x0 = CARD_X[i]
        const ownerW = c.owner ? c.owner.label.length * 8.6 : 0
        return (
          <motion.g key={c.code}
            initial={main ? { opacity: 0, y: 14, x: 0 } : false}
            animate={{ opacity: on ? 1 : 0, y: 0, x: on ? 0 : (i < MAIN ? 28 : -28) }}
            transition={{ duration: dur, delay: on ? (main ? 0.15 : 0.2) : 0, ease }}>
            <rect x={x0} y={CARD_Y} width={CARD_W} height={CARD_H} rx={8} fill="var(--navy-800)"
              stroke={planOn ? 'var(--blue-300)' : 'var(--line)'} strokeWidth={planOn ? 1.8 : 1}
              style={{ transition: 'stroke .5s, stroke-width .5s' }} />
            <text x={x0 + 18} y={CARD_Y + 26} fontSize={15} className="dim">{c.code}</text>
            {c.owner && (
              <g>
                <Glyph kind={c.owner.kind} x={x0 + CARD_W - 18 - ownerW - 22} y={CARD_Y + 22} s={0.62} />
                <text x={x0 + CARD_W - 18} y={CARD_Y + 26} textAnchor="end" fontSize={15} className="dim">{c.owner.label}</text>
              </g>
            )}
            <text x={x0 + 18} y={CARD_Y + 55} fontSize={21}>{c.name}</text>
          </motion.g>
        )
      })}

      {/* Assignment: one line per possible owner */}
      {TARGETS.map((t, i) => (
        <AssignLine key={t.kind} id={`tp-${i}`} d={lineD(tgtCx(t))} on={step >= t.at} delay={t.at === 0 ? 0.55 : 0.1 + i * 0.12} />
      ))}

      {/* The owners: a person from the start; a team and an org unit on step 1 */}
      {TARGETS.map(t => {
        const on = step >= t.at
        const x = tgtCx(t) - t.w / 2
        return (
          <motion.g key={t.kind}
            initial={t.at === 0 ? { opacity: 0, y: 12, x } : false}
            animate={{ opacity: on ? 1 : 0, y: on ? 0 : 12, x }}
            transition={{ duration: dur, delay: on ? (t.at === 0 ? 0.45 : 0.1) : 0, ease }}>
            <rect x={0} y={TGT_Y} width={t.w} height={TGT_H} rx={12} fill="var(--navy-800)" stroke="var(--line)" />
            <Glyph kind={t.kind} x={34} y={TGT_Y + TGT_H / 2} />
            <text x={66} y={TGT_Y + 35} fontSize={21}>{t.name}</text>
            <text x={66} y={TGT_Y + 60} fontSize={15} className="dim">{t.sub}</text>
          </motion.g>
        )
      })}
    </svg>
  )
}
