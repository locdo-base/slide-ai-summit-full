import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { FileText, BookMarked, Sparkles, ChevronDown, ChevronRight, Send, ScrollText } from 'lucide-react'
import { Av } from './parts'
import { RulesShell, RulesCol, RulesColRow } from './RulesWalkMock'

/* Official Company Policies › Ask AI: people ask the copilot about the company policies in
   plain words and it answers from the published rules it can see, naming
   the rules it used. Plays on its own as a short conversation — a question,
   a pause while it thinks, the answer — then round again. */

type Turn =
  | { who: 'user'; p: string; text: string; ms: number }
  | { who: 'ai'; text: string; sources: string[]; ms: number }
  | { who: 'typing'; ms: number }

const SCRIPT: Turn[] = [
  { who: 'user', p: 'L', text: 'Năm đầu tiên tôi được bao nhiêu ngày nghỉ phép có lương?', ms: 1300 },
  { who: 'typing', ms: 1100 },
  { who: 'ai', text: 'Trong năm đầu bạn có 15 ngày phép năm có lương, tích lũy 1,25 ngày mỗi tháng. Tối đa 5 ngày chưa dùng được chuyển sang năm sau.', sources: ['Chính sách nghỉ phép · POL-012', 'Sổ tay hội nhập · MAN-003'], ms: 2600 },
  { who: 'user', p: 'L', text: 'Tôi có thể nghỉ trọn một tuần trong thời gian thử việc không?', ms: 1300 },
  { who: 'typing', ms: 1100 },
  { who: 'ai', text: 'Được — nhưng trong thời gian thử việc, nghỉ quá 3 ngày liên tiếp cần quản lý phê duyệt trước ít nhất hai tuần.', sources: ['Chính sách nghỉ phép · POL-012 §4', 'Hướng dẫn thử việc · GLN-008'], ms: 2600 },
  { who: 'user', p: 'Q', text: 'Còn làm việc tại nhà — quy định thế nào?', ms: 1300 },
  { who: 'typing', ms: 1100 },
  { who: 'ai', text: 'Tối đa 2 ngày mỗi tuần làm tại nhà, thống nhất với trưởng nhóm. Làm từ xa trọn tuần thì tạo đề xuất trong app Đề xuất, do quản lý phê duyệt.', sources: ['Chính sách làm việc từ xa · POL-033'], ms: 3400 },
]

const HOLD = 2400

const ease = [0.2, 0.8, 0.2, 1] as const

export function AskRulesMock() {
  const reduce = useReducedMotion()
  // n = how many turns are on screen; SCRIPT.length + 1 is the hold before the loop.
  const [n, setN] = useState(reduce ? SCRIPT.length : 1)
  useEffect(() => {
    if (reduce) return
    const t = setTimeout(() => setN(n >= SCRIPT.length ? 1 : n + 1), SCRIPT[n - 1].ms + (n >= SCRIPT.length ? HOLD : 0))
    return () => clearTimeout(t)
  }, [n, reduce])
  const shown = SCRIPT.slice(0, n).filter((t, i) => t.who !== 'typing' || i === n - 1)

  return (
    <RulesShell on="company" col={
      <RulesCol title={<>Chính sách công ty<ChevronDown size={14} style={{ color: 'var(--mk-muted)' }} /></>}>
        <RulesColRow icon={<FileText size={14} />} label="Quy định" />
        <RulesColRow icon={<FileText size={14} />} label="Tài liệu" />
        <RulesColRow icon={<BookMarked size={14} />} label="Thuật ngữ" />
        <RulesColRow icon={<Sparkles size={14} />} label="Hỏi AI" on />
      </RulesCol>
    }>
      <div className="mk-head">
        <span className="crumb"><span style={{ color: 'var(--mk-muted)', fontWeight: 500 }}>Chính sách công ty</span><ChevronRight size={14} style={{ color: 'var(--mk-dim)' }} />Hỏi AI</span>
      </div>
      <div className="mk-ak">
        <div className="note">Câu trả lời lấy từ các quy định của service này — những quy định bạn được xem.</div>
        <div className="chat">
          <AnimatePresence initial={false}>
            {shown.map((t, i) => {
              const key = t.who === 'typing' ? `typing-${i}` : `${t.who}-${i}`
              return (
                <motion.div key={key} className={`turn ${t.who}`} layout
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: reduce ? 0 : 0.45, ease }}>
                  {t.who === 'user' && <><Av p={t.p} size={28} /><div className="bubble">{t.text}</div></>}
                  {t.who === 'typing' && <><i className="ai-ic"><Sparkles size={14} /></i><div className="bubble dots"><span /><span /><span /></div></>}
                  {t.who === 'ai' && (
                    <><i className="ai-ic"><Sparkles size={14} /></i>
                      <div className="bubble">
                        {t.text}
                        <div className="src">{t.sources.map(s => <span key={s}><ScrollText size={11} />{s}</span>)}</div>
                      </div></>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        <div className="ask"><span className="in">Hỏi về chính sách công ty…</span><span className="mk-btn" style={{ marginLeft: 0 }}><Send size={14} />Gửi</span></div>
      </div>
    </RulesShell>
  )
}
