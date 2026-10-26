import { Bot, User, Filter, Plus, Download, MoreHorizontal, MousePointer2 } from 'lucide-react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* What 99 percent of software is: a set of UI actions made for human
   accessibility, plus a representation of internal data. Agents do not
   think and act the same way. Two cards side by side: the screen a person
   works in (toolbar, buttons, a table, a cursor) and the same records as an
   agent needs them — a declared structure, every field with its type and its
   meaning. Both cards arrive together, just after the headline. No click. */
const ROWS = [
  ['Northwind Q3 renewal', 'Quote', '$ 1.2M', 'Jolie'],
  ['Harbor Foods rollout', 'Negotiation', '$ 860K', 'Daniel'],
  ['Delta Logistics upsell', 'Qualified', '$ 410K', 'Hazel'],
]

const SCHEMA: [string, string, string][] = [
  ['id', 'string', 'ổn định, duy nhất'],
  ['stage', 'enum', 'lead · qualified · quote · negotiation · won'],
  ['amount', 'money(USD)', 'giá trị hợp đồng dự kiến'],
  ['owner', 'ref(Employee)', 'người chịu trách nhiệm'],
  ['close_date', 'date', 'ngày dự kiến chốt'],
  ['actions', 'declared', 'advance · quote · assign · close'],
]

export function HumanAgentSlide() {
  return (
    <SlideFrame
      layout="stack"
      headline={<span className="ha-title">99% phần mềm = <em>Hướng tính năng</em></span>}
      lead={<span className="ha-title">Tập hợp thao tác UI cho <em>con người sử dụng</em> + <em>Biểu diễn</em> dữ liệu</span>}
    >
      <div className="ha">
        <Reveal at={0} delay={0.3} className="ha-card ha-human">
          <div className="ha-head"><i><User size={22} /></i><b>Cho con người</b><span>tập hợp thao tác UI · biểu diễn dữ liệu</span></div>
          <div className="ha-ui">
            <div className="ha-toolbar">
              <span><Plus size={14} />New deal</span><span><Filter size={14} />Filter</span><span><Download size={14} />Export</span><span className="more"><MoreHorizontal size={14} /></span>
            </div>
            <div className="ha-table">
              <div className="ha-tr ha-th"><span>Deal</span><span>Stage</span><span>Amount</span><span>Owner</span></div>
              {ROWS.map(r => <div key={r[0]} className="ha-tr">{r.map((c, i) => <span key={i}>{c}</span>)}</div>)}
            </div>
            <MousePointer2 className="ha-cursor" size={22} />
          </div>
          <p className="ha-note">Nhìn bằng mắt, thao tác bằng tay. Cấu trúc bị ẩn đi.</p>
        </Reveal>
        <Reveal at={0} delay={0.3} className="ha-card ha-agent">
          <div className="ha-head"><i><Bot size={22} /></i><b>Cho agent</b><span>cấu trúc rõ ràng · hành động được khai báo</span></div>
          <div className="ha-schema">
            <div className="ha-schema-title">Deal <em>service object</em></div>
            {SCHEMA.map(([k, t, m]) => (
              <div key={k} className="ha-field"><code>{k}</code><i>{t}</i><span>{m}</span></div>
            ))}
          </div>
          <p className="ha-note">Không cần nút bấm. Chỉ cần biết dữ liệu là gì, làm được gì.</p>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
