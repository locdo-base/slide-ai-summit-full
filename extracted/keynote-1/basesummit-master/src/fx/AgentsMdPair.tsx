import { motion, useReducedMotion } from 'motion/react'
import { FileText, Layers, Sparkles } from 'lucide-react'

/* Two AGENTS.md files side by side — the one a service defines and the one
   an agent brings. Both invented, both specific:
   the Enterprise Pipeline sales service, and Grace, Eric's chief of staff.
   Each line is typed so the file reads like a rendered markdown page rather
   than a wall of monospace: headings, section marks, bullets, and the tool
   names in code. Plays on its own — the files arrive one after the other. */

type Line =
  | { k: 'h'; t: string }
  | { k: 'meta'; t: string }
  | { k: 'sec'; t: string }
  | { k: 'p'; t: string }
  | { k: 'li'; t: string }
  | { k: 'code'; t: string }

const SERVICE: Line[] = [
  { k: 'h', t: 'Enterprise Pipeline' },
  { k: 'meta', t: 'service: sales/enterprise-pipeline · owner: Daniel, Head of Sales' },
  { k: 'sec', t: 'Mục đích' },
  { k: 'p', t: 'Đưa deal doanh nghiệp từ Qualified đến Closed Won. Mỗi deal có owner, giá trị, ngày đóng dự kiến.' },
  { k: 'sec', t: 'Object' },
  { k: 'code', t: 'deal { account, owner, stage, value_vnd, close_date, discount_pct, quote_id }' },
  { k: 'sec', t: 'Rules — đọc trước khi hành động' },
  { k: 'li', t: 'POL-014 Chiết khấu: ≤ 10% tự duyệt · 10–20% qua deal desk · > 20% CFO duyệt.' },
  { k: 'li', t: 'STD-021 Báo giá theo mẫu Enterprise Quote, hiệu lực 14 ngày.' },
  { k: 'li', t: 'Không gửi email cho khách. Chỉ soạn nháp — owner của deal gửi.' },
  { k: 'sec', t: 'Tools' },
  { k: 'code', t: 'sales:get_deal · sales:update_deal · sales:move_stage · quote:create_quote · task:create_task' },
  { k: 'sec', t: 'Playbook theo stage' },
  { k: 'li', t: 'Proposal: soạn báo giá từ deal, gắn quote_id, tạo task follow-up sau 3 ngày.' },
  { k: 'li', t: 'Negotiation: kiểm tra chiết khấu theo POL-014 trước khi move_stage.' },
]

const AGENT: Line[] = [
  { k: 'h', t: 'Grace' },
  { k: 'meta', t: 'agent: assistant · owner: Eric, CEO · model: Claude Sonnet 5' },
  { k: 'sec', t: 'Vai trò' },
  { k: 'p', t: 'Chief of staff của Eric: giữ lịch, theo dõi những gì cần Eric ký duyệt, chuẩn bị trước mỗi cuộc họp.' },
  { k: 'sec', t: 'Cách làm việc' },
  { k: 'li', t: 'Trả lời ngắn. Mỗi lần tối đa 3 việc cần Eric quyết.' },
  { k: 'li', t: 'Không xếp họp trước 09:30. Sáng thứ Năm để trống cho thiết kế. Phê duyệt: tóm tắt, không forward.' },
  { k: 'sec', t: 'Được làm · không được làm' },
  { k: 'li', t: 'Được: đọc lịch, email, tasks và mọi service Eric có quyền; soạn nháp; tự tạo task cho mình.' },
  { k: 'li', t: 'Không: gửi email thay Eric · duyệt chi trên 20 triệu · đưa dữ liệu ra ngoài workspace.' },
  { k: 'sec', t: 'Tools' },
  { k: 'code', t: 'calendar:* · gmail:draft · task:* · request:list_pending · service:get_object' },
  { k: 'sec', t: 'Memory' },
  { k: 'p', t: 'Ghi nhớ thói quen và ưu tiên của Eric. Không ghi nhớ tài chính cá nhân.' },
]

const ease = [0.2, 0.8, 0.2, 1] as const

function File({ path, Icon, tone, lines, delay }: { path: string; Icon: typeof FileText; tone: 'svc' | 'ag'; lines: Line[]; delay: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={`amd-file ${tone}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduce ? 0 : 0.6, delay: reduce ? 0 : delay, ease }}>
      <div className="amd-tab"><Icon size={18} strokeWidth={1.8} /><span>{path}</span><FileText size={15} strokeWidth={1.8} className="amd-md" /><b>AGENTS.md</b></div>
      <div className="amd-body">
        {lines.map((l, i) => {
          switch (l.k) {
            case 'h': return <div key={i} className="amd-h"><i>#</i>{l.t}</div>
            case 'meta': return <div key={i} className="amd-meta">{l.t}</div>
            case 'sec': return <div key={i} className="amd-sec"><i>##</i>{l.t}</div>
            case 'p': return <div key={i} className="amd-p">{l.t}</div>
            case 'li': return <div key={i} className="amd-li"><i>–</i>{l.t}</div>
            case 'code': return <div key={i} className="amd-code">{l.t}</div>
          }
        })}
      </div>
    </motion.div>
  )
}

/** The pair, 1640 wide. */
export function AgentsMdPair() {
  return (
    <div className="amd">
      <File path="sales/enterprise-pipeline" Icon={Layers} tone="svc" lines={SERVICE} delay={0.2} />
      <File path="agents/grace" Icon={Sparkles} tone="ag" lines={AGENT} delay={0.5} />
    </div>
  )
}
