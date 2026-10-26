import { motion, useReducedMotion } from 'motion/react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useStep } from '../../../engine/step'

/* The next token, and different answers, as one slide. An LLM does one
   thing — predict the next token — and the branches under "Cảm ơn bạn đã"
   show it doing so from the start; a footnote answers what a token is on
   its own. The one click draws two runs down different branches: same
   prompt, different answers. */
const OPTIONS = [
  { word: 'đặt hàng', p: 42, w: 206 },
  { word: 'chờ đợi', p: 21, w: 190 },
  { word: 'ủng hộ', p: 12, w: 176 },
  { word: 'đến sự kiện AI Summit', p: 6, w: 392 },
  { word: '…', p: 19, w: 76 },
]
const WEIGHT = [
  { opacity: 0.52, width: 4.8 },
  { opacity: 0.41, width: 4.2 },
  { opacity: 0.3, width: 3.7 },
  { opacity: 0.21, width: 3.1 },
  { opacity: 0.25, width: 3.4 },
]
const rowY = (i: number) => 120 + i * 115
const branch = (i: number) => `M 856 372 C 995 372, 990 ${rowY(i) + 34}, 1140 ${rowY(i) + 34}`
const RUNS = [
  { label: 'lần 1', pick: 0, y: 171, tone: 'var(--cyan-300)' },
  { label: 'lần 2', pick: 1, y: 551, tone: 'var(--amber-300)' },
]
const ease = [0.2, 0.8, 0.2, 1] as const

export function NextTokenSlide() {
  const reduce = useReducedMotion()
  const runs = useStep() >= 1
  const t = (delay: number, duration = 0.7) => ({ delay: reduce || !runs ? 0 : delay, duration: reduce ? 0 : duration, ease })
  return (
    <SlideFrame layout="center">
      <div className="tokens">
        <p className="ctx-kicker">Mô hình ngôn ngữ lớn (LLM)</p>
        <div className="tokens-stmt">Liên tục dự đoán <span className="tone-blue">token tiếp theo.</span></div>
        <div className="tokens-lead">
          {/* What kind of thing it is, until the click swaps in the point. */}
          <Reveal at={0} until={1} delay={0.6}><p className="lead muted"><strong>Stateless</strong> (độc lập, phi trạng thái), theo xác suất.</p></Reveal>
          <Reveal at={1}><p className="lead">Cùng một prompt có thể cho ra <strong>những câu trả lời khác nhau</strong>.</p></Reveal>
        </div>
        <svg viewBox="0 0 1660 700" width={1140} height={481}>
          {/* Arrival: the prompt, then the cursor line, then each branch draws
              out to its candidate — one after another, the way the model
              weighs its next token. */}
          <motion.text x={740} y={368} textAnchor="end" fontSize={72} fill="var(--white)" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, letterSpacing: '-.02em' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduce ? 0 : 0.3, duration: reduce ? 0 : 0.5, ease }}>Cảm ơn bạn đã</motion.text>
          <motion.line x1={766} y1={372} x2={850} y2={372} stroke="var(--muted)" strokeWidth={5} strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: reduce ? 0 : 0.8, duration: reduce ? 0 : 0.4, ease }} />
          {OPTIONS.map((o, i) => {
            const at = reduce ? 0 : 1.1 + i * 0.22
            return (
              <g key={o.word}>
                <motion.path d={branch(i)} fill="none" stroke="var(--blue-400)" strokeOpacity={WEIGHT[i].opacity} strokeWidth={WEIGHT[i].width}
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: at, duration: reduce ? 0 : 0.55, ease }} />
                <motion.g initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: at + (reduce ? 0 : 0.35), duration: reduce ? 0 : 0.4, ease }}>
                  <rect x={1150} y={rowY(i)} width={o.w} height={68} rx={34} fill="var(--navy-800)" stroke="var(--line-strong)" />
                  <text x={1150 + o.w / 2} y={rowY(i) + 45} textAnchor="middle" fontSize={32} fill="var(--blue-100)" style={{ fontFamily: 'var(--font-display)' }}>{o.word}</text>
                  <text x={1150 + o.w + 26} y={rowY(i) + 45} fontSize={26} fill="var(--dim)">{o.p}%</text>
                </motion.g>
              </g>
            )
          })}
          {RUNS.map((r, k) => {
            const at = 0.2 + k * 0.6
            return (
              <g key={r.label}>
                <motion.g initial={false} animate={{ opacity: runs ? 1 : 0 }} transition={t(at, 0.4)}>
                  <text x={825} y={r.y + 9} textAnchor="end" fontSize={26} fill={r.tone} style={{ fontFamily: 'var(--font-display)' }}>{r.label}</text>
                  <circle cx={847} cy={r.y} r={6} fill={r.tone} />
                  <path d={`M 853 ${r.y} C 915 ${r.y}, 895 372, 856 372`} fill="none" stroke={r.tone} strokeOpacity={0.5} strokeDasharray="3 6" />
                </motion.g>
                <motion.path d={branch(r.pick)} fill="none" stroke={r.tone} strokeWidth={5}
                  initial={false} animate={{ pathLength: runs ? 1 : 0, opacity: runs ? 1 : 0 }} transition={t(at + 0.2, 0.9)} />
                <motion.rect x={1150} y={rowY(r.pick)} width={OPTIONS[r.pick].w} height={68} rx={34} fill="none" stroke={r.tone} strokeWidth={3}
                  initial={false} animate={{ opacity: runs ? 1 : 0 }} transition={t(at + 1, 0.4)} />
              </g>
            )
          })}
        </svg>
        {/* The footnote answers itself a beat after the punchline — no click. */}
        <Reveal at={0} delay={3.4} from="none">
          <div className="tokens-foot">
            <span className="handline">token là gì?</span>
            <span className="tokens-def">Token là một <strong>đơn vị thông tin</strong> nhỏ mà AI dùng để đọc và tạo ra ngôn ngữ.</span>
            <span className="tokens-eg">
              <span className="small dim">predictable&nbsp;→</span>
              {['pre', 'dict', 'able'].map(t => <span className="tok still" key={t}>{t}</span>)}
            </span>
          </div>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
