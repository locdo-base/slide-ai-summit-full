import { motion, useReducedMotion } from 'motion/react'
import { Particle } from './Particle'

/* One service, drawn in three clicks — the three principles of SOA on one
   unit. Before that, with `askAt`, the unit is a circle in the middle of the
   stage asking "What is a service?" with its answer beneath; the first
   click slides it to its place and squares it straight into the named card. The Who: a card with a name and a purpose in plain English. The What:
   inputs on the left, outputs on the right — the interface, declared for the
   outside — and another service asking it "what can you do for me?". The How:
   the engine inside, veiled and versioned, changing while the ports stay
   exactly where they were. 880 × 540, for the left of a two-column figure. */

const W = 880, H = 540
const CARD = { x: 250, y: 110, w: 380, h: 330 }
const ease = [0.2, 0.8, 0.2, 1] as const
const BLUE = 'var(--blue-300)', CYAN = 'var(--cyan-300)'

const INPUTS = ['Customer', 'Products', 'Discount policy']
const OUTPUTS = ['Quote (PDF)', 'Price', 'Valid until']
const ENGINE = ['Pricing rules', 'Approval thresholds', 'Quote template']

interface Props {
  step: number
  whoAt?: number
  whatAt?: number
  howAt?: number
  /** Step from which the unit is the card; before it, a circle asking the
   *  question, shifted `askShift` px right to sit in the stage centre. 0 = off. */
  askAt?: number
  /** Explicit override of the asking state, for a slide that squares the
   *  unit on a timer rather than a click. */
  ask?: boolean
  /** What the circle says while asking, and the smaller line under it. */
  askText?: string
  askSub?: string
  askShift?: number
  id?: string
}

export function ServiceUnit({ step, whoAt = 1, whatAt = 2, howAt = 3, askAt = 0, ask: askProp, askText = 'What is a service?', askSub, askShift = 380, id = 'su' }: Props) {
  const reduce = useReducedMotion()
  const ask = askProp ?? (askAt > 0 && step < askAt)
  const who = step >= whoAt, what = step >= whatAt, how = step >= howAt
  const portY = (i: number) => CARD.y + 70 + i * 90
  const fade = (on: boolean, dy = 8) => ({ opacity: on ? 1 : 0, y: on ? 0 : dy })
  const t = (delay = 0) => ({ duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : delay })

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      <motion.g initial={false} animate={{ x: ask ? askShift : 0 }} transition={t()}>
      <circle cx={CARD.x + CARD.w / 2} cy={CARD.y + CARD.h / 2} r={300} fill="url(#halo-blue)" opacity={0.6} />

      {/* the card — a circle asking the question until the click, then dashed until it is named */}
      <motion.rect y={CARD.y} height={CARD.h} fill="var(--navy-800)"
        initial={false}
        animate={{ x: ask ? CARD.x + (CARD.w - CARD.h) / 2 : CARD.x, width: ask ? CARD.h : CARD.w, rx: ask ? CARD.h / 2 : 22,
          stroke: who ? BLUE : 'var(--line-strong)', strokeDasharray: who ? '0 0' : '10 8', strokeWidth: who ? 1.8 : 1.2 }} transition={t()} />
      <motion.g initial={false} animate={{ opacity: ask ? 1 : 0 }} transition={t()}>
        <text x={CARD.x + CARD.w / 2} y={CARD.y + CARD.h / 2 + (askSub ? -4 : 10)} fontSize={30} textAnchor="middle" className="sd">{askText}</text>
        {askSub && <text x={CARD.x + CARD.w / 2} y={CARD.y + CARD.h / 2 + 34} fontSize={21} textAnchor="middle" className="muted">{askSub}</text>}
      </motion.g>
      <motion.text x={CARD.x + CARD.w / 2} y={CARD.y + CARD.h / 2 + 8} fontSize={24} textAnchor="middle" className="dim"
        initial={false} animate={{ opacity: who || ask ? 0 : 1 }} transition={t()}>a service</motion.text>

      {/* WHO — a name and a purpose, in plain English */}
      <motion.g initial={false} animate={fade(who)} transition={t()}>
        <rect x={CARD.x + 28} y={CARD.y + 26} width={92} height={28} rx={14} fill="none" stroke={BLUE} strokeWidth={1.2} />
        <text x={CARD.x + 74} y={CARD.y + 45} fontSize={14} textAnchor="middle" className="tone-blue" style={{ letterSpacing: '.16em' }}>SERVICE</text>
        <text x={CARD.x + 28} y={CARD.y + 98} fontSize={34} className="sd">Quote a customer</text>
        <text x={CARD.x + 28} y={CARD.y + 134} fontSize={20} className="muted">Turn a request into a priced quote.</text>
        <text x={CARD.x + 28} y={CARD.y + 164} fontSize={17} className="dim" style={{ fontFamily: 'ui-monospace, Consolas, monospace' }}>quote-customer</text>
      </motion.g>

      {/* WHAT — inputs left, outputs right, declared for the outside */}
      <motion.g initial={false} animate={fade(what, 0)} transition={t()}>
        <text x={20} y={CARD.y + 22} fontSize={16} className="dim" style={{ letterSpacing: '.16em' }}>INPUTS</text>
        {INPUTS.map((label, i) => {
          const y = portY(i)
          const pid = `${id}-in${i}`
          return (
            <g key={label}>
              <path id={pid} d={`M 208 ${y} H ${CARD.x}`} fill="none" stroke="var(--line-strong)" strokeWidth={1.4} />
              {what && <Particle path={pid} dur={2.8} begin={-i * 0.9} r={5} />}
              <rect x={20} y={y - 22} width={188} height={44} rx={22} fill="var(--navy-900)" stroke="var(--line-strong)" />
              <text x={114} y={y + 7} fontSize={19} textAnchor="middle">{label}</text>
              <circle cx={CARD.x} cy={y} r={7} fill="var(--navy-900)" stroke={BLUE} strokeWidth={2} />
            </g>
          )
        })}
        <text x={W - 20} y={CARD.y + 22} fontSize={16} textAnchor="end" className="dim" style={{ letterSpacing: '.16em' }}>OUTPUTS</text>
        {OUTPUTS.map((label, i) => {
          const y = portY(i)
          const pid = `${id}-out${i}`
          return (
            <g key={label}>
              <path id={pid} d={`M ${CARD.x + CARD.w} ${y} H ${W - 208}`} fill="none" stroke="var(--line-strong)" strokeWidth={1.4} />
              {what && <Particle path={pid} dur={2.8} begin={-1.4 - i * 0.9} r={5} tone="cyan" />}
              <rect x={W - 208} y={y - 22} width={188} height={44} rx={22} fill="var(--navy-900)" stroke="var(--line-strong)" />
              <text x={W - 114} y={y + 7} fontSize={19} textAnchor="middle">{label}</text>
              <circle cx={CARD.x + CARD.w} cy={y} r={7} fill="var(--navy-900)" stroke={CYAN} strokeWidth={2} />
            </g>
          )
        })}
        {/* another service, asking */}
        <rect x={20} y={14} width={200} height={54} rx={12} fill="var(--navy-800)" stroke="var(--line-strong)" />
        <text x={120} y={47} fontSize={19} textAnchor="middle" className="muted">Sales pipeline</text>
        <path d={`M 220 41 Q 300 41 ${CARD.x + 30} ${CARD.y}`} fill="none" stroke="var(--line-strong)" strokeWidth={1.2} strokeDasharray="4 6" />
        <text x={236} y={30} fontSize={17} className="tone-blue" style={{ fontStyle: 'italic' }}>“What can you do for me?”</text>
      </motion.g>

      {/* HOW — the engine inside, veiled and evolving; the ports stay */}
      <motion.g initial={false} animate={fade(how)} transition={t()}>
        <rect x={CARD.x + 28} y={CARD.y + 190} width={CARD.w - 56} height={112} rx={12} fill="var(--navy-900)" stroke="var(--line)" />
        <rect x={CARD.x + 28} y={CARD.y + 190} width={CARD.w - 56} height={112} rx={12} fill={`url(#${id}-hatch)`} opacity={0.5} />
        {ENGINE.map((e, i) => (
          <g key={e}>
            <rect x={CARD.x + 44} y={CARD.y + 206 + i * 30} width={10} height={16} rx={2} fill="var(--dim)" />
            <text x={CARD.x + 64} y={CARD.y + 219 + i * 30} fontSize={16} className="muted">{e}</text>
          </g>
        ))}
        <text x={CARD.x + CARD.w - 44} y={CARD.y + 218} fontSize={14} textAnchor="end" className="dim" style={{ letterSpacing: '.14em' }}>ENGINE</text>
        {/* the version ticking over: internals change… */}
        {['v1', 'v2', 'v3'].map((v, i) => (
          <motion.text key={v} x={CARD.x + CARD.w - 44} y={CARD.y + 282} fontSize={26} textAnchor="end" className="sd tone-blue"
            initial={false}
            animate={how && !reduce ? { opacity: [0, 0, 1, 1, 0, 0] } : { opacity: i === 2 ? 1 : 0 }}
            transition={{ duration: 6, repeat: Infinity, times: [0, i / 3, i / 3 + 0.05, (i + 1) / 3 - 0.05, (i + 1) / 3, 1], ease: 'linear' }}>
            {v}
          </motion.text>
        ))}
        <text x={CARD.x + CARD.w / 2} y={CARD.y + CARD.h - 12} fontSize={16} textAnchor="middle" className="dim">internals hidden · change and evolve over time</text>
        {/* …while the interface does not */}
        <text x={CARD.x + CARD.w / 2} y={CARD.y + CARD.h + 34} fontSize={18} textAnchor="middle" className="tone-agent">interface unchanged</text>
      </motion.g>
      </motion.g>

      <defs>
        <pattern id={`${id}-hatch`} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="var(--blue-300)" strokeOpacity="0.18" strokeWidth="1" />
        </pattern>
      </defs>
    </svg>
  )
}
