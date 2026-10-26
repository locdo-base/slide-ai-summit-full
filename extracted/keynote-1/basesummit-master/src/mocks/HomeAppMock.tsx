import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  Home, Calendar, CheckSquare, CircleCheck, Inbox, Bookmark, StickyNote, User, Clock, BarChart2, Box, Target,
  Menu, Sparkles, Send, LayoutGrid, BookOpen, Plus, Settings, Check, ChevronDown, ShieldCheck, Minus, Info,
} from 'lucide-react'
import { TopBar } from './Window'
import { PfRail } from './PlatformMocks'

/* The Home app — the one place a person works with agents across every service.
   Left, the Service Assistant: one request, a short trace through the services
   it touched, the answer, the drafted quote — prefilled, nothing sent. Right,
   the service hubs: the services the assistant reached light up "đang dùng".
   Plays on its own as a short scene, then holds. Vietnamese copy with the
   product's own terms kept in English; invented names and numbers, after the
   Rework home reference. Every class is `hm-` prefixed: the deck's presenter
   chrome owns bare names like `.ctl`. */

const HOME_RAIL = [
  { key: 'home', label: 'Home', Icon: Home },
  { key: 'calendar', label: 'Calendar', Icon: Calendar },
  { key: 'tasks', label: 'Tasks', Icon: CheckSquare },
  { key: 'todos', label: 'Todos', Icon: CircleCheck },
  { key: 'inbox', label: 'Inbox', Icon: Inbox },
  { key: 'bookmarks', label: 'Bookmarks', Icon: Bookmark },
  { key: 'notes', label: 'Notes', Icon: StickyNote },
  { key: 'myhr', label: 'My HR', Icon: User },
  { key: 'sessions', label: 'Sessions', Icon: Clock },
  { key: 'workload', label: 'Workload', Icon: BarChart2 },
  { key: 'outputs', label: 'Outputs', Icon: Box },
  { key: 'goals', label: 'Goals', Icon: Target },
]

interface Hub { name: string; fam: string; tone: 'sales'; desc: string; svc: [string, string][] }

const HUBS: Hub[] = [
  { name: 'Vận hành Pipeline', fam: 'Sales Ops', tone: 'sales', desc: 'Mỗi motion một pipeline, giai đoạn riêng', svc: [
    ['Pipeline SMB', '7 giai đoạn · 1–50 seats'], ['Pipeline Mid-market', '8 giai đoạn · 50–500 seats'], ['Pipeline Enterprise', '9 giai đoạn · deal desk'], ['Pipeline qua đối tác', '7 giai đoạn · qua partner']] },
  { name: 'Vận hành Báo giá', fam: 'Sales Ops', tone: 'sales', desc: 'Mỗi loại báo giá một rule giá riêng', svc: [
    ['Báo giá tiêu chuẩn', 'Giá niêm yết · trần 10%'], ['Báo giá Enterprise', 'Điều khoản riêng · deal desk'], ['Báo giá gia hạn', 'Tăng giá và co-term']] },
  { name: 'Vận hành Hợp đồng', fam: 'Sales Ops', tone: 'sales', desc: 'Soạn thảo, ký kết và gia hạn', svc: [
    ['Hợp đồng mới', 'MSA + order form'], ['Hợp đồng gia hạn', 'Phụ lục và co-term'], ['Yêu cầu NDA', 'Hai chiều và một chiều']] },
]

/* The services the assistant's plan actually touched. */
const IN_USE = new Set(['Pipeline Enterprise', 'Báo giá Enterprise', 'Hợp đồng mới'])

const PLAN: [string, string, string][] = [
  ['Đọc deal và báo giá gần nhất', 'Pipeline Enterprise', 'BG-5510 · 1,25 tỷ ₫ · hết hạn 5/9'],
  ['Tính lại theo giá niêm yết hiện tại', 'Báo giá Enterprise', '1,18 tỷ ₫ sau chiết khấu 8%'],
  ['Kiểm tra rule chiết khấu khu vực miền Nam', 'Báo giá Enterprise', 'Hạn mức của bạn là 10% — 8% nằm trong hạn mức'],
  ['Chuẩn bị yêu cầu ký', 'Hợp đồng mới', '2 người ký · Sao Việt + bạn'],
]

/* Stages of the scene: 1 request · 2 working through the plan · 3 the answer
   · 4 the drafted quote · 5 the rest (considered, next questions, provenance). */
const STAGE_MS = [900, 2600, 1500, 1300]
const ease = [0.2, 0.8, 0.2, 1] as const

const ini = (s: string) => s.split(' ').slice(0, 2).map(w => w[0]).join('')

function Field({ label, value, hint, kind, wide }: { label: string; value: string; hint?: string; kind?: 'sel' | 'user' | 'ok' | 'date'; wide?: boolean }) {
  return (
    <div className={`hm-fld${wide ? ' wide' : ''}`}>
      <label>{label}</label>
      <div className={`hm-ctl${kind === 'ok' ? ' ok' : ''}`}>
        {kind === 'user' && <span className="hm-ini">{ini(value)}</span>}
        <span className="hm-v">{value}{hint && <em>{hint}</em>}</span>
        {kind === 'sel' && <ChevronDown size={12} />}
        {kind === 'date' && <Calendar size={12} />}
        {kind === 'ok' && <Check size={12} />}
      </div>
    </div>
  )
}

const rise = { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } }

export function HomeAppMock() {
  const reduce = useReducedMotion()
  const [stage, setStage] = useState(reduce ? 5 : 1)
  useEffect(() => {
    if (reduce || stage >= 5) return
    const t = setTimeout(() => setStage(stage + 1), STAGE_MS[stage - 1])
    return () => clearTimeout(t)
  }, [stage, reduce])
  const tr = { duration: reduce ? 0 : 0.4, ease }
  const lit = stage >= 2

  return (
    <div className="mk-pf mk-home">
      <TopBar placeholder="Tìm bất cứ thứ gì…" />
      <div className="mk-app">
        <PfRail active="home" items={HOME_RAIL} />
        <div className="mk-main hm-panes">
          {/* ── Service Assistant ─────────────────────────────────────── */}
          <div className="hm-chat">
            <div className="hm-chead">
              <Menu size={15} style={{ color: 'var(--mk-muted)' }} />
              <i className="hm-spark"><Sparkles size={12} /></i>
              <b>Service Assistant</b>
            </div>
            <div className="hm-cbody">
              <motion.div className="hm-ask" {...rise} transition={tr}>Gửi báo giá cho Sao Việt và lấy chữ ký</motion.div>

              <AnimatePresence initial={false} mode="wait">
                {stage === 2 && (
                  <motion.div key="plan" className="hm-plan" {...rise} exit={{ opacity: 0, y: -6, transition: { duration: 0.2 } }} transition={tr}>
                    <div className="hm-thk"><span className="hm-dots"><span /><span /><span /></span>Đang suy nghĩ, rồi đi qua 4 bước trong 3 services</div>
                    <ol>
                      {PLAN.map(([t, svc, out], i) => (
                        <motion.li key={t} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.5, duration: 0.35, ease }}>
                          <Check size={12} /><span className="hm-t">{t}</span><span className="hm-svc">{svc}</span><span className="hm-out">{out}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </motion.div>
                )}
              </AnimatePresence>

              {stage >= 3 && (
                <motion.div className="hm-blk" {...rise} transition={tr}>
                  <div className="hm-thought"><Check size={12} />Đã suy nghĩ, rồi đi qua 4 bước trong 3 services<span className="hm-ms">3.8s</span></div>
                  <p className="hm-say">Báo giá gần nhất cho Sao Việt đã hết hạn ngày 5/9. Tính lại theo giá hiện tại còn <b>1,18 tỷ ₫</b> — chiết khấu 8%, trong hạn mức 10% của bạn, nên không cần qua deal desk. Sẵn sàng gửi dưới tên bạn.</p>
                  <div className="hm-callq"><Info size={13} /><span><b>Rule chiết khấu · miền Nam</b> — Bạn được giảm tối đa 10%. Vượt mức đó, báo giá chuyển qua deal desk trước.</span></div>
                </motion.div>
              )}

              {stage >= 4 && (
                <motion.div className="hm-form" initial={{ opacity: 0, scale: 0.98, y: 8 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.5, ease }}>
                  <div className="hm-fh"><b>Báo giá</b><span className="hm-pill">NHÁP</span><span className="hm-code">BG-5518</span></div>
                  <p className="hm-path"><b>Vận hành Báo giá</b> › Báo giá Enterprise</p>
                  <div className="hm-fields">
                    <Field label="Deal" value="Sao Việt · Platform 2026 · gói năm, Net 30" kind="sel" wide />
                    <Field label="Tổng giá trị" value="1.180.000.000 ₫" />
                    <Field label="Chiết khấu" value="8%" hint="trần 10%" kind="ok" />
                    <Field label="Hiệu lực đến" value="31/10/2026" kind="date" />
                    <Field label="Người ký" value="Trần Minh Long + bạn" kind="user" />
                  </div>
                  <div className="hm-fa">
                    <span className="hm-hint">Điền sẵn từ 3 services · đã soạn, chưa gửi</span>
                    <span className="hm-btn ghost">Sửa</span>
                    <span className="hm-btn">Gửi ký</span>
                  </div>
                </motion.div>
              )}

              {stage >= 5 && (
                <motion.div className="hm-blk" {...rise} transition={tr}>
                  <p className="hm-lbl">Đã cân nhắc · không dùng · 2</p>
                  <div className="hm-box">
                    <div className="hm-brow"><div className="hm-bt">Báo giá gia hạn<Minus size={12} /></div><div className="hm-br">Sao Việt chưa có subscription đang chạy — đây là deal mới.</div></div>
                    <div className="hm-brow"><div className="hm-bt">Pipeline qua đối tác<Minus size={12} /></div><div className="hm-br">Deal này đến trực tiếp, không qua đối tác.</div></div>
                  </div>
                  <div className="hm-next"><span>Nâng chiết khấu lên 10%</span><span>Lần trước Sao Việt trả bao nhiêu?</span></div>
                  <div className="hm-prov"><ShieldCheck size={13} /><span><b>1 deal · 2 báo giá · 1 rule chiết khấu</b> được đọc bởi các services trong quyền truy cập của Eric. Assistant không tự viết ra con số nào.</span></div>
                </motion.div>
              )}
            </div>
            <div className="hm-comp"><span>Mô tả việc bạn cần…</span><i><Send size={13} /></i></div>
            <p className="hm-fnote">Câu trả lời trích từ knowledge của công ty · hành động luôn do bạn quyết định</p>
          </div>

          {/* ── Service hubs ──────────────────────────────────────────── */}
          <div className="hm-hubs">
            <div className="hm-hhead">
              <span className="hm-tab on"><LayoutGrid size={14} />Service hubs</span>
              <span className="hm-tab"><BookOpen size={14} />Knowledge</span>
              <span className="hm-nh"><Plus size={13} />Hub mới</span>
              <Settings size={14} style={{ color: 'var(--mk-dim)' }} />
            </div>
            <div className="hm-hlist">
              {HUBS.map(h => {
                const touched = h.svc.some(([n]) => IN_USE.has(n))
                return (
                  <div key={h.name} className={`hm-hub ${h.tone}${lit && !touched ? ' dim' : ''}`}>
                    <div className="hm-hh"><i /><b>{h.name}</b><span className="hm-fam">{h.fam}</span><span className="hm-ct">{h.svc.length} services</span></div>
                    <p className="hm-hd">{h.desc}</p>
                    <div className="hm-acts">
                      {h.svc.map(([n, d]) => {
                        const on = lit && IN_USE.has(n)
                        return (
                          <div key={n} className={`hm-act${on ? ' on' : lit ? ' off' : ''}`}>
                            <span className="hm-ti">{ini(n)}</span>
                            <span className="hm-cl"><span className="hm-n">{n}</span><span className="hm-d">{d}</span></span>
                            {on && <span className="hm-use">đang dùng</span>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
