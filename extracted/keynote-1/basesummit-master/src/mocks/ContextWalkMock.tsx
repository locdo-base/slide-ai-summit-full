import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import {
  Menu, Columns3, ChevronRight, MoreHorizontal, DollarSign, Building2, Flag, Pencil, Eye, Users, UserPlus, Paperclip,
  ShoppingCart, FileText, Mail, Calendar, Phone, MessageSquare, CheckSquare, ChevronDown, ClipboardCheck, MessagesSquare,
  BookOpen, Network, Workflow, Send, Timer, Bot, Sparkles, FilePen, Activity, Info, Plus, History, X, ArrowUp,
  CalendarDays, Layers, Clock, Hourglass, Check,
} from 'lucide-react'
import { TopBar } from './Window'
import { Av, PEOPLE, Pill, SideRow, Sec } from './parts'
import { PfRail, SALES_RAIL } from './PlatformMocks'
import { useBrand } from '../ui/Brand'

/* Context discovery, on a deal: the Sales Pipeline's deal page — the capture's
   layout — with the service copilot embedded beside it. The page stands still;
   the slide walks five clicks over it — one id, the object, the service, its
   rules and tools, then the agent acting on the deal — ringing the part of the
   page each call reads (`data-callout`) with a popover that runs the call and
   prints what came back. Invented names and numbers. */

export interface ContextStep {
  key: string
  /** The `data-callout` the step rings. */
  target: 'id' | 'object' | 'service' | 'rules'
  /** Where the popover sits against the ring. */
  side: 'down' | 'up' | 'right' | 'up-right' | 'down-right'
  /** The call, as the step's box shows it. */
  code: string
  /** What comes back, in a phrase. */
  out?: string
  /** What the agent knows afterwards. */
  knows: string
}

export const CONTEXT_WALK: ContextStep[] = [
  { key: 'id', target: 'id', side: 'down-right', code: 'id', out: '→ 149918', knows: 'một deal id — và không gì khác' },
  { key: 'object', target: 'object', side: 'down', code: 'getObject(id)', out: '→ { deal, service_id }', knows: 'biết object, và service mà nó thuộc về' },
  { key: 'service', target: 'service', side: 'down', code: 'getService(service_id)', out: '→ định nghĩa · goals · prompts · data model', knows: 'biết service để làm gì, cách để thắng deal, và object có cấu trúc ra sao' },
  { key: 'rules', target: 'rules', side: 'right', code: 'getRules(service)\ngetTools(service)\nAGENTS.md', out: '→ context vận hành đầy đủ', knows: 'biết phải tuân theo gì, được làm gì, làm thế nào' },
  { key: 'actions', target: 'object', side: 'down', code: 'exec:', out: 'enrich(deal) · project(deal) · createTask(deal, task)', knows: 'giờ nó làm việc — trong service, trên object' },
]

/* What runs at each step, and what came back. */
export const CALLS: { fn: string; ms: number; result: string }[][] = [
  [{ fn: 'input', ms: 34, result: '{ "object_id": 149918 }' }],
  [{
    fn: 'getObject(149918)', ms: 41,
    result: '{\n  "id": 149918,\n  "name": "MY - FERRIS Sportfolio Swimming Academy - Iza Hamzah",\n  "value": 1499, "currency": "USD",\n  "stage": "2nd_demo_booked", "probability": 0.8,\n  "owner": "daniel",\n  "service_id": "sales-pipeline"\n}',
  }],
  [{
    fn: 'getService("sales-pipeline")', ms: 58,
    result: '{\n  "id": "sales-pipeline",\n  "name": "Sales Pipeline",\n  "purpose": "chốt deal",\n  "goals": [\n    "qualify: vấn đề, người quyết định, ngân sách, thời điểm",\n    "đặt lịch demo lần 2 với người quyết định",\n    "gửi proposal trong 3 ngày sau demo",\n    "chốt trong 30 ngày kể từ SAL"\n  ],\n  "system_prompt": "Bạn là copilot của Sales Pipeline, đồng hành cùng deal…",\n  "object": { "type": "deal", "fields": 52, "stages": 9 },\n  "operators": ["sales", "sdr", "copilot"]\n}',
  }],
  [
    {
      fn: 'getRules("sales-pipeline")', ms: 47,
      result: '[\n  { "id": "discount", "rule": "giảm ≤ 10% nếu chưa có CFO duyệt" },\n  { "id": "region",   "rule": "chỉ khách hàng EMEA" },\n  { "id": "contact",  "rule": "không tự gửi email cho khách" }\n]',
    },
    {
      fn: 'getTools("sales-pipeline")', ms: 39,
      result: '{\n  "tools":  ["enrich", "project", "createTask", "comment"],\n  "skills": ["quote_review", "forecast", "risk_flag"]\n}',
    },
    {
      fn: 'AGENTS.md', ms: 12,
      result: '# Sales Pipeline · agent\n- Vai trò: copilot của deal owner\n- Cách làm: qualify → demo → proposal → chốt\n- Giới hạn: không tự gửi email, không tự chiết khấu',
    },
  ],
  [
    { fn: 'enrich(deal)', ms: 812, result: '{ "company": "FERRIS Sportfolio", "staff": 45, "segment": "học viện thể thao" }' },
    { fn: 'project(deal)', ms: 236, result: '{ "probability": 0.8, "expected_close": "2026-10-02", "risk": "chậm phản hồi" }' },
    { fn: 'createTask(deal, task)', ms: 92, result: '{ "task_id": "T-2031", "title": "Chuẩn bị demo lần 2",\n  "assignee": "daniel", "due": "2026-09-19" }' },
  ],
]

/** One call in the popover: appears, runs for a beat, then shows what came
 *  back. `delay` staggers the calls of one step. */
export function Call({ fn, ms, result, delay = 0 }: { fn: string; ms: number; result: string; delay?: number }) {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), delay * 1000 + 900)
    return () => clearTimeout(t)
  }, [delay])
  return (
    <motion.div className="call" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay }}>
      <div className="hd">
        <span className="pr">›</span><code>{fn}</code>
        {done
          ? <span className="st ok"><Check size={13} />{ms} ms</span>
          : <span className="st run">running<i>.</i><i>.</i><i>.</i></span>}
      </div>
      {done && <motion.pre initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>{result}</motion.pre>}
    </motion.div>
  )
}

/** The calls of one step, stacked in a popover. */
export function CallStack({ calls }: { calls: { fn: string; ms: number; result: string }[] }) {
  return <>{calls.map((c, i) => <Call key={c.fn} {...c} delay={i * 1.1} />)}</>
}

const STAGES = ['1 Qualification (SQL Booked)', 'Meeting Done 24H', '2 Discovery (SAL)', '2nd Demo Booked', '2nd Demo Done', '3 Solution (Opp)', '4 Commercial (Proposal)', '5 Payment', 'Onboard / Update']
const DEAL = 'MY - FERRIS Sportfolio Swimming Academy - Iza Hamzah'
const OWNER = 'D'

const SUGGEST: [string, string[]][] = [
  ['VỀ DEAL NÀY', ['Tóm tắt deal này trong vài dòng.', 'Bước tiếp theo nên là gì?', 'Deal này có gì thiếu hoặc bất thường không?']],
  ['BỐI CẢNH', ['Các deal tương tự đã chốt thế nào?', 'Deal đã ở stage này bao lâu, và ai đang giữ?']],
]

const Kv = ({ k, v, tag, icon }: { k: string; v: React.ReactNode; tag?: boolean; icon?: React.ReactNode }) => (
  <div className="mk-dd-kv"><span>{icon}{k}</span>{tag ? <b className="tag">{v}</b> : <b>{v}</b>}</div>
)

/* The service's copilot, embedded beside the deal — still, as the user found it. */
function Panel() {
  const { wordmark } = useBrand()
  return (
    <aside className="cw-panel">
      <div className="ph">
        <span className="ai"><Sparkles size={13} /></span><b>Copilot</b><Pill kind="medium">BETA</Pill>
        <span className="acts"><Info size={15} /><History size={15} /><MoreHorizontal size={15} /><X size={15} /></span>
      </div>
      <div className="pb">
        <div className="focus"><span>Focus:</span><FileText size={12} />{DEAL}</div>
        <div className="ask on"><Paperclip size={14} /><span>Đặt câu hỏi</span><i><ArrowUp size={13} /></i></div>
        <div className="sugg">
          {SUGGEST.map(([h, qs]) => (
            <div key={h} className="grp">
              <small>{h}</small>
              {qs.map(q => <a key={q}>{q}</a>)}
            </div>
          ))}
          <div className="more"><ChevronRight size={13} />Xem thêm</div>
        </div>
      </div>
      <div className="pf">Powered by {wordmark} AI. Results may be inaccurate.</div>
    </aside>
  )
}

export function ContextWalkMock() {
  return (
    <div className="mk-pf mk-dd mk-cw mk-cx">
      <TopBar />
      <div className="mk-app">
        <PfRail active="pipelines" items={SALES_RAIL} />
        <div className="mk-side" style={{ width: 216 }}>
          <SideRow icon={<DollarSign size={15} />} label="Deal" on />
          <SideRow icon={<ShoppingCart size={15} />} label="Commerce" />
          <SideRow icon={<FileText size={15} />} label="Notes" />
          <SideRow icon={<Mail size={15} />} label="Emails" />
          <SideRow icon={<Calendar size={15} />} label="Meetings" />
          <SideRow icon={<Phone size={15} />} label="Calls" />
          <SideRow icon={<MessageSquare size={15} />} label="Chats" />
          <SideRow icon={<CheckSquare size={15} />} label="Tasks" />
          <Sec><span><ChevronDown size={12} style={{ verticalAlign: -2 }} /> COLLABORATIONS</span></Sec>
          <SideRow icon={<ClipboardCheck size={15} />} label="Todos" />
          <SideRow icon={<MessagesSquare size={15} />} label="Feedbacks" />
          <SideRow icon={<BookOpen size={15} />} label="Stories" />
          <SideRow icon={<Network size={15} />} label="Orgchart" />
          <div className="cx-ops" data-callout="rules">
            <Sec><span><ChevronDown size={12} style={{ verticalAlign: -2 }} /> SMART OPS</span></Sec>
            <SideRow icon={<Workflow size={15} />} label="Automations" />
            <SideRow icon={<Send size={15} />} label="Sequences" />
            <SideRow icon={<Timer size={15} />} label="SLAs" />
            <SideRow icon={<Bot size={15} />} label="Agent flows" />
          </div>
          <div className="mk-pf-sidefoot">
            <div className="row"><Sparkles size={15} /><span>Copilot</span><Pill kind="medium">BETA</Pill></div>
            <SideRow icon={<FilePen size={15} />} label="Edit deal" />
            <SideRow icon={<Activity size={15} />} label="Activity logs" />
          </div>
        </div>
        <div className="mk-main cw-main">
          <div className="mk-head">
            <Menu size={15} style={{ color: 'var(--mk-muted)' }} />
            <span className="crumb"><Columns3 size={14} /> Base | Sales Pipeline <ChevronRight size={13} className="sep" /> <span style={{ color: 'var(--mk-ink)' }}>{DEAL}</span> <code data-callout="id">#149918</code></span>
            <span className="mk-btn" style={{ background: 'var(--mk-green)' }}>Won</span>
            <span className="mk-btn" style={{ marginLeft: 0, background: 'var(--mk-red)' }}>Lost</span>
            <MoreHorizontal size={16} style={{ color: 'var(--mk-muted)', marginLeft: 6 }} />
          </div>
          <div className="mk-dd-title" data-callout="object">
            <div>
              <b>{DEAL}</b>
              <div className="meta"><span><DollarSign size={13} />$1,499</span><span><Building2 size={13} />FERRIS Sportfolio Swimming Academy</span></div>
            </div>
            <div className="owner"><Av p={OWNER} size={38} /><div><b>{PEOPLE[OWNER].name}</b><span>Deal owner</span></div></div>
          </div>
          <div data-callout="service">
            <div className="mk-dd-stages">
              {STAGES.map((s, i) => <span key={s} className={i < 3 ? 'done' : i === 3 ? 'on' : undefined}>{s}</span>)}
            </div>
            <div className="mk-dd-sub">
              <span><Columns3 size={13} /> Base | Sales Pipeline <ChevronRight size={12} /> <i /> 2nd Demo Booked</span>
              <span className="r">Probability: <b>80%</b><em><Flag size={13} /> Set expected closed date</em></span>
            </div>
          </div>
          <div className="mk-dd-body">
            <div className="col">
              <div className="mk-pf-box">
                <div className="bh"><b>Overview</b><Pencil size={13} /></div>
                <Kv k="Projected value" v={<Pill kind="medium">Active</Pill>} />
                <div className="mk-dd-kv"><span>USD</span><b className="big">1,499</b></div>
                <div className="mk-dd-kv"><span>Probability</span><b className="prob">80</b></div>
                <Kv k="Pipeline" v={<>Base | Sales Pipeline<br />› 2nd Demo Booked</>} />
              </div>
              <div className="mk-pf-box">
                <div className="bh"><b>Primary contact</b><Pencil size={13} /></div>
                <span className="hint">Chưa có liên hệ chính.</span>
                <Sec>ADDITIONAL CONTACTS (0) <Plus size={12} /></Sec>
              </div>
              <div className="mk-pf-box">
                <div className="bh"><b>Primary account</b><Pencil size={13} /></div>
                <div className="contact"><span className="mk-av" style={{ background: '#16A34A', width: 40, height: 40, fontSize: 13 }}>FS</span><div><b>FERRIS Sportfolio Swimming Academy</b></div><ChevronRight size={14} /></div>
              </div>
              <div className="mk-pf-box">
                <div className="bh"><b>Deal flows</b></div>
                <Kv icon={<CalendarDays size={13} />} k="Created at" v="Sep 08, 2026 00:01" />
                <Kv icon={<Layers size={13} />} k="Current stage" v={<span style={{ color: 'var(--mk-blue-ink)' }}>2nd Demo Booked (4/9)</span>} />
                <Kv icon={<Clock size={13} />} k="Joined stage at" v="Sep 11, 2026 17:48" />
                <Kv icon={<Flag size={13} />} k="Expected close" v="NA" />
                <Kv icon={<Hourglass size={13} />} k="Deal age" v="9 ngày" />
                <Kv icon={<Activity size={13} />} k="Inactive days" v="9 ngày" />
              </div>
            </div>
            <div className="col mid">
              <div className="mk-pf-box">
                <div className="bh"><b>Custom fields</b><Pencil size={13} /></div>
                <div className="fh"><span>18/52 fields</span><span><Eye size={13} /> Show empty fields (34)</span></div>
                <div className="grp"><ChevronDown size={13} /> General information</div>
                <Kv k="Deal type" v="New" tag />
                <Kv k="Why has this deal become SAL? What is the next steps?" v="Gặp sếp lần 2 để chốt phạm vi" />
                <Kv k="Lead Source ID v2" v="lead228206" />
                <Kv k="Primary Contact v2" v="29934" />
                <Kv k="Primary Account v2" v="29934" />
                <Kv k="Deal ID v2" v="149,918.00" />
                <Kv k="Deal link v2" v="https://standard.base.vn/sales/deal/149918" />
                <Kv k="SAL Date" v="Sep 5, 2026" />
                <Kv k="SQL Status" v="Done" tag />
                <Kv k="Additional Note v2" v={`LDR/SDR: ${PEOPLE.Z.name}`} />
                <Kv k="Deal created date" v="Sep 4, 2026" />
                <div className="grp"><ChevronDown size={13} /> <i className="n">1</i> Qualification (SQL Booked)</div>
                <Kv k="(P) Problem" v="Đã xác nhận vấn đề — quy trình hiện tại “gần như thủ công”, đội ngũ “quá tải”. Isa là người duy nhất phụ trách sales, marketing và kiêm vận hành; phản hồi chậm khiến khách hàng rơi vào tay đối thủ. Mục tiêu: 30 học viên/tháng, hiện tại 10–20." />
                <Kv k="(O) Owner (EO-PO)" v="Đã hỏi — chưa có câu trả lời. Nhiều khả năng là sếp: “sếp tôi muốn xem số liệu trước”." />
              </div>
            </div>
            <div className="col">
              <div className="mk-pf-box">
                <div className="bh"><b>Owner &amp; team</b></div>
                <div className="contact framed"><Av p={OWNER} size={40} /><div><b>{PEOPLE[OWNER].name}</b><span>Deal owner</span></div><Pencil size={13} /></div>
                <div className="line"><b>Collaborators (0)</b><em><Users size={13} /> Collab</em></div>
                <span className="hint">Mời đồng nghiệp cùng làm deal này</span>
                <div className="line"><b>Followers</b><em>Add followers <UserPlus size={13} style={{ marginLeft: 8 }} /> Follow</em></div>
                <span className="hint">Chưa có người theo dõi.</span>
              </div>
              <div className="mk-pf-box">
                <div className="bh"><b>Forecasts</b></div>
                <div className="line"><span className="cap">0 FORECAST ENTRIES</span><em><Plus size={12} /> Enroll in forecast</em></div>
                <span className="hint">Chưa đưa vào kỳ dự báo nào.</span>
                <Kv k="Weighted value" v={<>$1,199 <small>(80%)</small></>} />
              </div>
              <div className="mk-pf-box">
                <div className="bh"><b>Files</b><Paperclip size={13} /></div>
                <span className="hint">Chưa có tệp đính kèm.</span>
              </div>
            </div>
          </div>
          <Panel />
        </div>
      </div>
    </div>
  )
}
