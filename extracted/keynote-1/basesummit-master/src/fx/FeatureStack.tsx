import { motion, useReducedMotion } from 'motion/react'
import { useStep } from '../engine/step'
import { AgentMark, HumanMark } from './Actors'

const ease = [0.2, 0.8, 0.2, 1] as const
const LINE = 'var(--line-strong)', RAISED = 'var(--navy-800)', DEEP = 'var(--navy-950)', C = 'var(--cyan-300)', B = 'var(--blue-400)'
/** Both panels share one shape: a 480 × 340 drawing, a column of readings
 *  from COL, a caption on the row beneath. */
const W = 480, COL = 540

interface Props {
  /** Build steps at which the Model panel and the Context panel land. */
  modelAt?: number
  contextAt?: number
}

/** Why feature-driven software is not how people and agents work together,
 *  drawn as two panels of the same shape. Left, the Model: a cross-section of
 *  ground — strata of data tables and features piled up over the years, new
 *  features still landing on top, cracks running through, and at the very
 *  bottom, buried, the model. Right, the Context: a screen built for a
 *  person's eyes and hands, and an agent that cannot tell what a button or a
 *  field is for. 1640 × 520. */
export function FeatureStack({ modelAt = 1, contextAt = 2 }: Props) {
  const step = useStep()
  const reduce = useReducedMotion()
  const d = (s: number) => (reduce ? 0 : s)
  const panel = (on: boolean, delay = 0) => ({
    initial: false as const,
    animate: { opacity: on ? 1 : 0, y: on ? 0 : 14 },
    transition: { duration: d(0.7), delay: on ? d(delay) : 0, ease },
  })
  const model = step >= modelAt, context = step >= contextAt
  // No glosses under the two headings — they would only repeat the heading.
  const modelGloss = null, contextGloss = null

  // Strata from the bottom up — x offset, width, label, and whether it is a
  // data table (dark) or a feature (raised). The bottom one holds the model.
  const TABLE = 'data table', FEATURE = 'feature'
  const strata: [number, number, string | null, boolean][] = [
    [0, 480, null, true],
    [10, 460, TABLE, true],
    [4, 468, FEATURE, false],
    [22, 438, TABLE, true],
    [12, 452, FEATURE, false],
    [34, 416, FEATURE, false],
    [46, 392, 'new feature', false],
  ]
  // Three tenants, the same kinds of layer in three different orders.
  const tenants: [number, boolean][][] = [
    [[0, true], [8, false], [2, false], [10, true], [4, false], [7, false]],
    [[6, false], [0, true], [9, true], [3, false], [7, false], [1, false]],
    [[3, false], [9, false], [0, true], [6, false], [2, true], [8, false]],
  ]
  const fields: [string, string, number, boolean?][] = [
    ['Customer name', 'Northwind Co.', 300],
    ['Status', 'In progress', 190, true],
    ['Value', '1,250,000,000', 150],
    ['Signed on', '05/09/2026', 150],
  ]
  const cracks: [string, number, number][] = [
    ['290,176 278,215 296,256 280,298 298,342 282,386 296,428 288,450', 2.2, 0.7],
    ['110,178 122,214 108,250 120,288 112,318', 1.5, 0.45],
  ]

  return (
    <svg width={1640} height={520} viewBox="0 0 1640 520" style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id="fs-depth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: 'var(--navy-950)', stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: 'var(--navy-950)', stopOpacity: 0.78 }} />
        </linearGradient>
      </defs>

      {/* ── Model: a cross-section, the model at the bottom of it ────────── */}
      <motion.g {...panel(model)}>
        <text x={0} y={40} fontSize={40} className="sd">Model</text>
        {modelGloss && <text x={0} y={72} fontSize={24} className="dim">{modelGloss}</text>}

        {/* features keep landing on top — motion owns the transform on the
            element it animates, so the tilt sits on a plain <g> inside */}
        {[[20, 118, -4], [180, 126, 3], [340, 116, -2]].map(([x, y, r], i) => (
          <motion.g key={i} initial={false} animate={{ opacity: model ? 1 : 0, y: model ? 0 : -14 }}
            transition={{ duration: d(0.5), delay: d(0.9 + i * 0.15), ease }}>
            <g transform={`rotate(${r} ${x + 60} ${y + 15})`}>
              <rect x={x} y={y} width={120} height={30} rx={7} fill="none" stroke={B} strokeWidth={1.2} strokeDasharray="6 5" />
              <text x={x + 60} y={y + 20} fontSize={16} textAnchor="middle" className="tone-blue">{'+ feature'}</text>
            </g>
          </motion.g>
        ))}

        {/* the ground */}
        <rect x={0} y={172} width={W} height={278} rx={10} fill={DEEP} opacity={0.5} />
        {strata.map(([x, w, label, data], i) => {
          const y = 414 - i * 40
          return (
            <motion.g key={i} initial={false} animate={{ opacity: model ? 1 : 0, y: model ? 0 : 12 }}
              transition={{ duration: d(0.5), delay: d(0.1 + i * 0.09), ease }}>
              <rect x={x} y={y} width={w} height={36} rx={6} fill={data ? DEEP : RAISED} stroke={LINE} />
              {label && <text x={x + 16} y={y + 24} fontSize={17} className="dim">{label}</text>}
            </motion.g>
          )
        })}
        {/* deeper is darker */}
        <rect x={0} y={174} width={W} height={276} rx={8} fill="url(#fs-depth)" style={{ pointerEvents: 'none' }} />
        {/* the cracks: a soft halo under a sharp line */}
        {cracks.map(([pts, w, o], i) => (
          <g key={i}>
            {[[w * 4, o * 0.18], [w, o]].map(([sw, so], j) => (
              <motion.polyline key={j} points={pts} fill="none" stroke="var(--blue-200)" strokeWidth={sw} strokeLinejoin="round" opacity={so}
                initial={false} animate={{ pathLength: model ? 1 : 0 }} transition={{ duration: d(1), delay: d(0.8 + i * 0.2), ease: 'easeInOut' }} />
            ))}
          </g>
        ))}
        {/* the model, at the very bottom, barely there */}
        <circle cx={30} cy={432} r={26} fill="var(--blue-300)" opacity={0.1} />
        <circle cx={30} cy={432} r={9} fill="none" stroke="var(--blue-200)" strokeWidth={1.4} strokeDasharray="4 3" />
        <text x={48} y={437} fontSize={15} className="dim">model</text>

        {/* the readings */}
        <line x1={468} y1={132} x2={COL - 14} y2={132} stroke={LINE} strokeDasharray="4 3" />
        <text x={COL} y={140} fontSize={24} className="tone-blue">{'Unstable'}</text>
        <text x={COL} y={164} fontSize={18} className="dim">{'always chasing features'}</text>

        <text x={COL} y={246} fontSize={24} className="tone-blue">{'Fragmented'}</text>
        <text x={COL} y={270} fontSize={18} className="dim">{'every business redefines it'}</text>
        {tenants.map((bands, t) => (
          <g key={t} transform={`translate(${COL + t * 70} 0)`}>
            {bands.map(([o, data], i) => <rect key={i} x={o} y={292 + i * 17} width={58} height={13} rx={3} fill={data ? DEEP : RAISED} stroke={LINE} />)}
            <text x={30} y={412} fontSize={15} textAnchor="middle" className="dim">{'ABC'[t]}</text>
          </g>
        ))}

        {/* the caption: the buried thing, pulled out */}
        <line x1={30} y1={444} x2={30} y2={471} stroke={LINE} strokeDasharray="4 3" />
        <circle cx={30} cy={489} r={15} fill="none" stroke="var(--blue-200)" strokeWidth={1.4} strokeDasharray="4 3" />
        <circle cx={30} cy={489} r={4} fill="var(--blue-200)" />
        <text x={70} y={488} fontSize={24} className="tone-blue">{'Hidden & Ad hoc'}</text>
        <text x={70} y={512} fontSize={18} className="dim">{'buried under layer upon layer of data'}</text>
      </motion.g>

      {/* ── Context: a screen for eyes and hands ─────────────────────────── */}
      {/* The offset sits on a plain <g>: motion writes its own transform on the
          element it animates, which would replace an attribute there. */}
      <motion.g {...panel(context)}>
       <g transform="translate(860 0)">
        <text x={0} y={40} fontSize={40} className="sd">Context</text>
        {contextGloss && <text x={0} y={72} fontSize={24} className="dim">{contextGloss}</text>}

        {/* the window */}
        <rect x={0} y={110} width={W} height={340} rx={14} fill={RAISED} stroke={LINE} />
        <path d={`M 0 144 H ${W}`} stroke={LINE} />
        {[18, 36, 54].map(x => <circle key={x} cx={x} cy={127} r={5} fill="var(--dim)" opacity={0.6} />)}
        <rect x={1} y={145} width={110} height={304} fill="var(--navy-900)" opacity={0.55} />
        {[172, 198, 224, 250, 276].map((y, i) => <rect key={y} x={16} y={y} width={i === 1 ? 78 : 60} height={8} rx={4} fill="var(--dim)" opacity={i === 1 ? 0.9 : 0.4} />)}
        {/* toolbar */}
        <rect x={130} y={164} width={80} height={30} rx={6} fill="none" stroke={LINE} />
        <text x={170} y={184} fontSize={15} textAnchor="middle" className="muted">{'Filter'}</text>
        <rect x={220} y={164} width={90} height={30} rx={6} fill="none" stroke={LINE} />
        <text x={265} y={184} fontSize={15} textAnchor="middle" className="muted">{'Sort'}</text>
        <rect x={330} y={164} width={110} height={30} rx={6} fill="var(--blue-500)" data-callout="btn" />
        <text x={385} y={184} fontSize={15} textAnchor="middle">{'Save'}</text>
        {/* focus ring — drawn for the keyboard, not for a model */}
        <rect x={325} y={159} width={120} height={40} rx={9} fill="none" stroke="var(--blue-200)" strokeWidth={1.2} strokeDasharray="5 4" opacity={0.7} />
        {/* form */}
        {fields.map(([label, value, w, select], i) => {
          const y = 214 + i * 56
          return (
            <g key={label}>
              <text x={130} y={y} fontSize={15} className="dim">{label}</text>
              <rect x={130} y={y + 10} width={w} height={32} rx={6} fill="var(--navy-900)" stroke={LINE} />
              <text x={140} y={y + 31} fontSize={15} className="muted">{value}</text>
              {select && <path d={`M ${130 + w - 18} ${y + 23} l 6 6 l 6 -6`} fill="none" stroke="var(--dim)" strokeWidth={1.5} />}
            </g>
          )
        })}

        {/* the person the screen is for — with the pointer on the button */}
        <g transform="translate(0 462)"><HumanMark size={54} /></g>
        <text x={70} y={488} fontSize={24} className="tone-human">Made for human</text>
        <text x={70} y={512} fontSize={18} className="dim">{'interface first, for eyes and hands'}</text>
        <path d="M 392 204 l 0 22 l 6 -5 l 5 10 l 4 -2 l -5 -10 l 8 -1 z" fill="var(--amber-300)" stroke="var(--navy-900)" strokeWidth={1} />

        {/* the agent, and what it cannot read: the button, and the field —
            the second leader drops beside the form before it turns in */}
        <g transform={`translate(${COL} 196)`}><AgentMark size={64} /></g>
        <path d={`M ${COL} 232 C 500 232, 480 180, 448 180`} fill="none" stroke={C} strokeWidth={1.4} strokeDasharray="6 5" opacity={0.8} />
        <path d={`M ${COL} 240 C 505 240, 505 296, 344 296`} fill="none" stroke={C} strokeWidth={1.4} strokeDasharray="6 5" opacity={0.8} />
        {[[436, 180], [332, 296]].map(([x, y]) => (
          <g key={x}>
            <circle cx={x} cy={y} r={12} fill="var(--navy-900)" stroke={C} strokeWidth={1.4} />
            <text x={x} y={y + 5} fontSize={15} textAnchor="middle" className="tone-agent">?</text>
          </g>
        ))}
        <text x={COL} y={290} fontSize={18} className="tone-agent">{'What is this button for?'}</text>
        <text x={COL} y={316} fontSize={18} className="tone-agent">{'What goes in this field?'}</text>

        <text x={COL} y={140} fontSize={24} className="tone-blue">UI-first</text>
        <text x={COL} y={164} fontSize={18} className="dim">{'the UI is all it exposes'}</text>
        <text x={COL} y={400} fontSize={24} className="tone-blue">Accessibility-driven</text>
        <text x={COL} y={425} fontSize={18} className="dim">{'for people to see and click'}</text>
       </g>
      </motion.g>
    </svg>
  )
}
