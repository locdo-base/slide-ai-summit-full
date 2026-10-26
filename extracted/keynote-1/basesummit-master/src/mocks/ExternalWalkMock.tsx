import { useEffect, useState } from 'react'
import { FileText, Globe, Plus, KeyRound, Webhook } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { TopBar } from './Window'
import { WorkforceSide } from './PlatformMocks'
import { WebformBuilderMock } from './WebformBuilderMock'
import { useWalk, type WalkStep } from '../ui/Walk'

/* Connecting out, as two screens walked on a timer: a webform built inside a
   workflow service (Builder · Form) that people outside the company fill in,
   then the service
   gateways that let outside systems call it. SAMPLE placeholder — Eric's
   captures replace both screens. Inside a <Walk> the slide drives it; alone
   it runs its own timer. */
type Key = 'webforms' | 'gateways'
export const EXTERNAL_WALK: (WalkStep & { key: Key })[] = [
  { key: 'webforms', name: 'Webform', ms: 3800 },
  { key: 'gateways', name: 'Cổng kết nối service', ms: 3800 },
]

type Row = { name: string; sub: string; target: string; meta: string; on?: boolean }
const PAGES: Record<Key, { icon: typeof Globe; title: string; intro: string; add: string; cols: [string, string, string]; rows: Row[] }> = {
  webforms: {
    icon: FileText, title: 'Webform', add: 'Tạo webform',
    intro: 'Form công khai tạo bản ghi trong service — cho khách hàng, ứng viên và đối tác, không cần tài khoản.',
    cols: ['WEBFORM', 'TẠO TRONG', 'LƯỢT GỬI'],
    rows: [
      { name: 'Đề xuất onboarding khách hàng', sub: 'forms.base.vn/acme/onboarding', target: 'workflow.customer_onboarding', meta: '1,284', on: true },
      { name: 'Ứng tuyển — Senior Backend Engineer', sub: 'forms.base.vn/acme/careers/be', target: 'hiring.pipeline.candidate', meta: '342', on: true },
      { name: 'Liên hệ bán hàng', sub: 'forms.base.vn/acme/contact', target: 'sales.pipeline.lead', meta: '2,907', on: true },
      { name: 'Đăng ký nhà cung cấp', sub: 'forms.base.vn/acme/vendors', target: 'request.purchasing.vendor', meta: '96', on: true },
      { name: 'Yêu cầu bảo hành', sub: 'forms.base.vn/acme/warranty', target: 'service.desk.ticket', meta: '58' },
    ],
  },
  gateways: {
    icon: Globe, title: 'Cổng kết nối service', add: 'Tạo cổng mới',
    intro: 'Một endpoint chuẩn cho mỗi service — có xác thực, giới hạn tần suất và ghi log — cho mọi hệ thống bên ngoài Base.',
    cols: ['CỔNG KẾT NỐI', 'SERVICE', 'LƯỢT GỌI / 24H'],
    rows: [
      { name: 'Đơn hàng Shopify', sub: 'POST /gw/sales.order', target: 'sales.pipeline.order', meta: '18,420', on: true },
      { name: 'Đồng bộ kế toán (MISA)', sub: 'POST /gw/finance.invoice', target: 'finance.ledger.invoice', meta: '3,112', on: true },
      { name: 'Tin nhắn Zalo OA', sub: 'POST /gw/crm.conversation', target: 'crm.inbox.conversation', meta: '9,875', on: true },
      { name: 'Máy chấm công', sub: 'POST /gw/hr.attendance', target: 'hr.timesheet.checkin', meta: '41,006', on: true },
      { name: 'Cổng đối tác', sub: 'GET /gw/request.status', target: 'request.purchasing', meta: '—' },
    ],
  },
}

const GRID = 'minmax(0, 1.3fr) minmax(0, 1fr) 120px 90px'

function Screen({ k }: { k: Key }) {
  const p = PAGES[k]
  return (
    <div className="mk-pf mk-ex">
      <TopBar />
      <div className="mk-app">
        <WorkforceSide active="services" />
        <div className="mk-main">
          <div className="mk-head">
            <span className="svc-ic"><p.icon size={16} /></span>
            <span className="crumb" style={{ fontSize: 16 }}>{p.title}</span>
          </div>
          <div className="mk-ex-main" style={{ maxWidth: 'none' }}>
            <div className="mk-ex-intro">
              {k === 'webforms' ? <FileText size={18} /> : <KeyRound size={18} />}
              <div><b>{p.title}</b><span>{p.intro}</span></div>
              <span className="mk-btn"><Plus size={14} />{p.add}</span>
            </div>
            <div className="mk-ex-cols" style={{ gridTemplateColumns: GRID }}>
              <span>{p.cols[0]}</span><span>{p.cols[1]}</span><span className="r">{p.cols[2]}</span><span>TRẠNG THÁI</span>
            </div>
            {p.rows.map(r => (
              <div key={r.name} style={{ display: 'grid', gridTemplateColumns: GRID, gap: 12, alignItems: 'center', padding: '14px 22px', border: '1px solid var(--mk-line)', borderRadius: 10 }}>
                <span style={{ display: 'grid', gap: 2 }}><b style={{ fontSize: 14 }}>{r.name}</b><code style={{ fontSize: 12, color: 'var(--mk-muted)' }}>{r.sub}</code></span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--mk-muted)' }}><Webhook size={14} /><code>{r.target}</code></span>
                <span style={{ textAlign: 'right', fontSize: 14, fontVariantNumeric: 'tabular-nums' }}>{r.meta}</span>
                <span style={{ fontSize: 11.5, fontWeight: 700, color: r.on ? '#16A34A' : 'var(--mk-muted)' }}>{r.on ? 'HOẠT ĐỘNG' : 'TẠM DỪNG'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ExternalWalkMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % EXTERNAL_WALK.length), EXTERNAL_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const key: Key = walk ? EXTERNAL_WALK[walk.index].key : reduce ? 'webforms' : EXTERNAL_WALK[own].key

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={key}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
          {key === 'webforms' ? <WebformBuilderMock /> : <Screen k={key} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
