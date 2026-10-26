import { useEffect, useState } from 'react'
import {
  ArrowLeft, Layers, Info, Package, LayoutGrid, Target, Box, Webhook, ArrowLeftRight, Bot, CalendarClock, Star, History,
  Plus, ArrowRight, Trash2, X, Search, ChevronDown, Type, Hash, Calendar, CheckCircle2, Filter, Wand2, ListPlus, FilePlus2,
  ShieldCheck, GripVertical, MoreHorizontal, Sparkles,
} from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { TopBar } from './Window'
import { SideRow, Sec } from './parts'
import { WorkforceSide } from './PlatformMocks'
import { useWalk, type WalkStep } from '../ui/Walk'

/* Service exchange, as two screens walked on a timer: a service's Exchanges
   page — its events wired to other services, each a one-way transfer with
   its own mapping — and then one exchange opened on its field mapping, source
   field to destination field. Drawn from Eric's captures. Inside a <Walk>
   the slide drives it; alone it runs its own timer. */
type Key = 'exchanges' | 'mapping'
export const EXCHANGE_WALK: (WalkStep & { key: Key })[] = [
  { key: 'exchanges', name: 'Kết nối service', ms: 3800 },
  { key: 'mapping', name: 'Ánh xạ trường dữ liệu', ms: 4200 },
]

const EXCHANGES: { to: string; toId: string; icon: typeof Layers; tint?: boolean; ev: string; on?: boolean }[] = [
  { to: 'Baseline Planning', toId: 'workforce.workforce.hc_plan', icon: Layers, ev: 'request.approved', on: true },
  { to: 'Offers Extended', toId: 'workforce.system.output', icon: ShieldCheck, tint: true, ev: 'request.approved', on: true },
  { to: 'Employee Onboarding', toId: 'hr.hris.onboarding', icon: Layers, ev: 'request.approved', on: true },
  { to: 'Payroll Setup', toId: 'finance.payroll.employee', icon: Layers, ev: 'offer.accepted', on: true },
  { to: 'Headcount Budget', toId: 'finance.budget.headcount', icon: Layers, ev: 'request.approved' },
  { to: 'Hiring Pipeline', toId: 'hiring.pipeline.candidate', icon: Layers, ev: 'request.rejected', on: true },
  { to: 'Slack #people-ops', toId: 'webhook.slack.people_ops', icon: Webhook, tint: true, ev: 'request.approved', on: true },
]

const MAPPINGS: [string, string][] = [
  ['name', 'planitem.title'], ['form.position_id', 'planitem.position_id'], ['form.start_date', 'planitem.start_at'],
  ['form.base_salary', 'planitem.cost'], ['status', 'planitem.status'],
]
const DEST: { n: string; I: typeof Type }[] = [
  { n: 'id', I: Type }, { n: 'system_id', I: Hash }, { n: 'user_id', I: Hash }, { n: 'service_id', I: Type }, { n: 'created_at', I: Calendar },
]

function ExchangesScreen({ dialog }: { dialog?: boolean }) {
  return (
    <div className="mk-pf mk-ex">
      <TopBar />
      <div className="mk-app">
        <WorkforceSide active="services" />
        <div className="mk-main">
          <div className="mk-head">
            <span className="mk-pf-back"><ArrowLeft size={14} /></span>
            <span className="svc-ic"><Layers size={16} /></span>
            <span className="crumb" style={{ fontSize: 16 }}>Job Offer <code>request.approval</code></span>
          </div>
          <div className="mk-ex-body">
            <div className="mk-side mk-ex-nav">
              <SideRow icon={<Info size={15} />} label="Tổng quan" />
              <SideRow icon={<Package size={15} />} label="Bản ghi" />
              <SideRow icon={<LayoutGrid size={15} />} label="Trường dữ liệu" />
              <SideRow icon={<Target size={15} />} label="Mô hình đầu ra" />
              <SideRow icon={<Box size={15} />} label="Bản ghi đầu ra" />
              <Sec>TỰ ĐỘNG HÓA</Sec>
              <SideRow icon={<Webhook size={15} />} label="Webhooks" />
              <SideRow icon={<ArrowLeftRight size={15} />} label="Trao đổi dữ liệu" on />
              <SideRow icon={<Bot size={15} />} label="Bot" />
              <SideRow icon={<CalendarClock size={15} />} label="Lịch chạy" />
              <Sec>VẬN HÀNH</Sec>
              <SideRow icon={<Star size={15} />} label="Đánh giá service" />
              <SideRow icon={<History size={15} />} label="Nhật ký hoạt động" />
            </div>
            <div className="mk-ex-main">
              <div className="mk-ex-intro">
                <ArrowLeftRight size={18} />
                <div><b>Trao đổi dữ liệu service</b><span>Nối sự kiện của service này tới các service nội bộ khác hoặc webhook bên ngoài. Mỗi trao đổi là một luồng chuyển dữ liệu một chiều với ánh xạ trường riêng.</span></div>
                <span className="mk-btn"><Plus size={14} />Thêm trao đổi</span>
              </div>
              <div className="mk-ex-cols"><span>TRAO ĐỔI SERVICE</span><span className="r">SỰ KIỆN KÍCH HOẠT</span><span>TRẠNG THÁI</span><span>THAO TÁC</span></div>
              {EXCHANGES.map(e => (
                <div key={e.to} className="mk-ex-row">
                  <span className="svc"><i><Layers size={16} /></i><div><b>Job Offer</b><code>request.request.approval</code></div></span>
                  <ArrowRight size={16} className="arrow" />
                  <span className="svc"><i className={e.tint ? 'tint' : undefined}><e.icon size={16} /></i><div><b>{e.to}</b><code>{e.toId}</code></div></span>
                  <span className="ev">{e.ev}</span>
                  <span className={e.on ? 'st' : 'st off'}>{e.on ? 'HOẠT ĐỘNG' : 'TẠM DỪNG'}</span>
                  <span className="mk-btn ghost" style={{ marginLeft: 0 }}>Xem</span>
                  <span className="del"><Trash2 size={14} /></span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {dialog && <div className="mk-ex-veil" />}
      {dialog && <MappingDialog />}
    </div>
  )
}

function MappingDialog() {
  return (
    <div className="mk-ex-dialog">
      <div className="dh"><ArrowLeftRight size={18} /><b>Job Offer → Baseline Planning</b><span className="st">HOẠT ĐỘNG</span><X size={18} className="x" /></div>
      <div className="tabs"><span>CHI TIẾT</span><span className="on">CHUYỂN ĐỔI TRƯỜNG</span><span>NHẬT KÝ TRAO ĐỔI</span><MoreHorizontal size={16} className="more" /></div>
      <div className="dbody">
        <div className="pair">
          <div className="ends">
            <span className="svc"><i><Layers size={16} /></i><div><b>Job Offer</b><code>request.approval</code></div></span>
            <ArrowRight size={16} className="arrow" />
            <span className="svc rev"><div><b>Baseline Planning</b><code>workforce.hc_plan</code></div><i><Layers size={16} /></i></span>
          </div>
          <div className="mode"><span className="cap">TRƯỜNG NHẬN VÀO</span><span className="seg"><span><Sparkles size={13} />Tự điền</span><span className="on"><Filter size={13} />Chọn lọc</span></span><span className="note">Chỉ các trường ánh xạ bên dưới được ghi vào lead; trường chưa ánh xạ sẽ bị bỏ qua.</span></div>
        </div>
        <div className="work">
          <div className="maps">
            <div className="mh"><b>Ánh xạ trường <em>5</em></b><span className="mk-btn ghost sq"><Search size={14} /></span><span className="mk-btn ghost" style={{ marginLeft: 0 }}><ListPlus size={14} />Chọn trường</span><span className="mk-btn ghost" style={{ marginLeft: 0 }}><FilePlus2 size={14} />Thêm trường mới</span></div>
            {MAPPINGS.map(([a, b]) => (
              <div key={a} className="map">
                <CheckCircle2 size={16} className="ok" />
                <span className="fld"><i><Type size={13} /></i><div><b>{a}</b><code>{a}</code></div></span>
                <ArrowRight size={14} className="arrow" />
                <span className="fld"><i><Type size={13} /></i><div><b>{b}</b><code>{b}</code></div></span>
              </div>
            ))}
          </div>
          <div className="dest">
            <div className="mh"><b>Trường đích</b><span className="cnt">0/9 đã ánh xạ</span></div>
            <div className="tools"><span className="in"><Search size={13} />Tìm trường…</span><span className="in">Mọi kiểu <ChevronDown size={13} /></span></div>
            <span className="cap">HỆ THỐNG</span>
            {DEST.map(d => <div key={d.n} className="df"><i><d.I size={13} /></i><div><b>{d.n}</b><code>{d.n}</code></div><GripVertical size={14} className="grip" /></div>)}
          </div>
        </div>
        <div className="foot"><span className="mk-btn ghost" style={{ marginLeft: 0 }}><Wand2 size={14} />Tự ánh xạ trường</span><span className="mk-btn ghost" style={{ marginLeft: 0 }}><ShieldCheck size={14} />Kiểm tra</span><span className="mk-btn dim">Lưu</span></div>
      </div>
    </div>
  )
}

export function ExchangeWalkMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % EXCHANGE_WALK.length), EXCHANGE_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const key: Key = walk ? EXCHANGE_WALK[walk.index].key : reduce ? 'exchanges' : EXCHANGE_WALK[own].key

  return (
    <div style={{ position: 'relative' }}>
      <ExchangesScreen dialog={false} />
      <AnimatePresence>
        {key === 'mapping' && (
          <motion.div key="dialog" style={{ position: 'absolute', inset: 0 }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <div className="mk-ex-veil" />
            <motion.div initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }} transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
              <MappingDialog />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
