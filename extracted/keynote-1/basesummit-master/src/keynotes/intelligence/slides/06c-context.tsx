import { motion, useReducedMotion } from 'motion/react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useStep } from '../../../engine/step'
import { useCountUp } from '../../../fx/useCountUp'

/* The question on its own, then — a beat later, no click — the answer,
   centred. The one click moves the answer to the left and replays the
   prediction from the token slide beside it, exactly as it was. Then three
   pieces of context land, one after another — a fact, a source, an action —
   and the probabilities re-weight in front of the room: one branch takes
   nearly everything. Context is everything. */
const OPTIONS = [
  { word: 'đặt hàng', p0: 42, p: 4, w: 206 },
  { word: 'chờ đợi', p0: 21, p: 2, w: 190 },
  { word: 'ủng hộ', p0: 12, p: 3, w: 176 },
  { word: 'đến sự kiện AI Summit', p0: 6, p: 90, w: 392 },
  { word: '…', p0: 19, p: 1, w: 76 },
]
const WEIGHT = [
  { opacity: 0.52, width: 4.8 },
  { opacity: 0.41, width: 4.2 },
  { opacity: 0.3, width: 3.7 },
  { opacity: 0.21, width: 3.1 },
  { opacity: 0.25, width: 3.4 },
]
const PICK = 3
const FACTS = [
  { k: 'Fact', v: 'Hôm nay là ngày tổ chức AI Summit.' },
  { k: 'Source', v: 'Bạn là khách hàng của Base.' },
  { k: 'Action', v: 'Bạn vừa mới check-in.' },
]
/* The click's timeline, in seconds: the prediction returns, the facts land,
   the context points at the prompt, the weights move. */
const SHOW = 0.5
const FACT_AT = (i: number) => 1.1 + i * 0.6
const ARROW_AT = 2.9
const REWEIGHT = 3.5
const rowY = (i: number) => 120 + i * 115
const branch = (i: number) => `M 856 372 C 995 372, 990 ${rowY(i) + 34}, 1140 ${rowY(i) + 34}`
const ease = [0.2, 0.8, 0.2, 1] as const

/** One option's share: counts from the old figure to the new one when the
 *  weights move; the winning share steps up in size and colour as it does. */
function Share({ o, i, on, hot, reduce }: { o: typeof OPTIONS[number]; i: number; on: boolean; hot: boolean; reduce: boolean | null }) {
  const v = useCountUp(o.p, on, { from: o.p0, duration: 1.1, delay: REWEIGHT })
  const n = `${Math.round(v)}%`
  const x = 1150 + o.w + 26, y = rowY(i) + 45
  const t = (delay: number) => ({ delay: reduce || !on ? 0 : delay, duration: reduce ? 0 : 0.4, ease })
  return (
    <>
      <motion.text x={x} y={y} fontSize={26} fill="var(--dim)" initial={false} animate={{ opacity: on && hot ? 0 : 1 }} transition={t(REWEIGHT)}>{n}</motion.text>
      {hot && (
        <motion.text x={x} y={y + 3} fontSize={36} fill="var(--cyan-300)" style={{ fontFamily: 'var(--font-display)', fontWeight: 500 }}
          initial={false} animate={{ opacity: on ? 1 : 0 }} transition={t(REWEIGHT)}>{n}</motion.text>
      )}
    </>
  )
}

export function ContextSlide() {
  const reduce = useReducedMotion()
  const on = useStep() >= 1
  const d = (delay: number, duration = 0.6) => ({ delay: reduce || !on ? 0 : delay, duration: reduce ? 0 : duration, ease })
  return (
    <SlideFrame layout="center">
      <div className={`ctx2${on ? ' on' : ''}`}>
        <motion.div layout className="ctx-answer" transition={{ duration: reduce ? 0 : 0.8, ease }}>
          <Reveal at={0} delay={0.5}><motion.p layout="position" className="lead">Vậy điều gì giúp dự đoán <strong>tốt hơn</strong>?</motion.p></Reveal>
          <Reveal at={0} delay={2.2}><motion.div layout className="bigword" transition={{ duration: reduce ? 0 : 0.8, ease }}>Context.</motion.div></Reveal>
          <Reveal at={0} delay={2.6}>
            <motion.p layout="position" className="ctx-more">AI càng có nhiều ngữ cảnh, nó càng hiểu rõ bạn muốn nói gì, điều gì quan trọng, điều gì đã xảy ra, bạn kỳ vọng gì — và từ đó, điều gì nên đến tiếp theo.</motion.p>
          </Reveal>
        </motion.div>

        <div className="ctx2-fig">
          {/* The context, one piece at a time. */}
          <div className="ctx2-facts">
            <motion.p className="ctx-kicker" initial={false} animate={{ opacity: on ? 1 : 0 }} transition={d(FACT_AT(0) - 0.3, 0.4)}>Ngữ cảnh</motion.p>
            {FACTS.map((f, i) => (
              <motion.div key={f.k} className="ctx2-fact" initial={false} animate={{ opacity: on ? 1 : 0, x: on ? 0 : -24 }} transition={d(FACT_AT(i), 0.5)}>
                <b>{f.k}</b><span>{f.v}</span>
              </motion.div>
            ))}
          </div>

          {/* The prediction: back as it was, then re-weighted once the context is in. */}
          <Reveal at={1} delay={SHOW} from="none" keep={false}>
            {/* The viewBox starts above the drawing so the arrow from the context
                box has room to reach the prompt. */}
            <svg viewBox="0 -60 1660 760" width={960} height={440}>
              <motion.path d="M 430 -50 C 430 120, 520 130, 520 276" fill="none" stroke="var(--cyan-300)" strokeWidth={4} strokeLinecap="round" strokeDasharray="2 12"
                initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={d(ARROW_AT, 0.6)} />
              <motion.path d="M 504 262 L 520 288 L 536 262" fill="none" stroke="var(--cyan-300)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"
                initial={false} animate={{ opacity: on ? 1 : 0 }} transition={d(ARROW_AT + 0.5, 0.25)} />
              <text x={740} y={368} textAnchor="end" fontSize={72} fill="var(--white)" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '-.02em' }}>Cảm ơn bạn đã</text>
              <line x1={766} y1={372} x2={850} y2={372} stroke="var(--muted)" strokeWidth={5} strokeLinecap="round" />
              {OPTIONS.map((o, i) => {
                const hot = i === PICK
                const dimTo = hot ? 0 : 0.16
                return (
                  <g key={o.word}>
                    {/* The branch as the token slide drew it, thinning away as the weights move. */}
                    <motion.path d={branch(i)} fill="none" stroke="var(--blue-400)" initial={false}
                      animate={{ pathLength: on ? 1 : 0, strokeOpacity: on ? dimTo : WEIGHT[i].opacity, strokeWidth: on ? 2.4 : WEIGHT[i].width }}
                      transition={{ pathLength: d(SHOW + 0.1 + i * 0.1, 0.5), strokeOpacity: d(REWEIGHT, 0.9), strokeWidth: d(REWEIGHT, 0.9) }} />
                    {hot && (
                      <motion.path d={branch(i)} fill="none" stroke="var(--cyan-300)" strokeWidth={6.5} strokeLinecap="round" initial={false}
                        animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={d(REWEIGHT, 1)} />
                    )}
                    <motion.g initial={false} animate={{ opacity: on ? 1 : 0 }} transition={d(SHOW + 0.3 + i * 0.1, 0.4)}>
                      <rect x={1150} y={rowY(i)} width={o.w} height={68} rx={34} fill="var(--navy-800)" stroke="var(--line-strong)" />
                      {hot && (
                        <motion.rect x={1150} y={rowY(i)} width={o.w} height={68} rx={34} fill="none" stroke="var(--cyan-300)" strokeWidth={3}
                          initial={false} animate={{ opacity: on ? 1 : 0 }} transition={d(REWEIGHT + 0.6, 0.4)} />
                      )}
                      <motion.text x={1150 + o.w / 2} y={rowY(i) + 45} textAnchor="middle" fontSize={32} fill={hot ? 'var(--white)' : 'var(--blue-100)'} style={{ fontFamily: 'var(--font-display)' }}
                        initial={false} animate={{ fillOpacity: on && !hot ? 0.45 : 1 }} transition={d(REWEIGHT, 0.9)}>{o.word}</motion.text>
                      <Share o={o} i={i} on={on} hot={hot} reduce={reduce} />
                    </motion.g>
                  </g>
                )
              })}
            </svg>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  )
}
