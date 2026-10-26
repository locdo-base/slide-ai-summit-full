import {
  Briefcase, Bookmark, Search, ChevronDown, ChevronRight, Plus, Star, AlertCircle, Workflow,
  ArrowUpDown, SlidersHorizontal, Filter, MoreHorizontal,
} from 'lucide-react'
import { TopBar } from './Window'
import { SideRow, Sec, Av } from './parts'

/* Workflows · one process's jobs board, as the app draws it — the sidebar of
   workflow services with one opened, the process's tabs, and the jobs by
   stage: some waiting for an owner, some done. Invented companies. */

interface Job { code: string; name: string; desc: string; star?: boolean; who?: string }

const TODO: Job[] = [
  { code: 'JOB-2026-0001', name: 'Acme Logistics — Onboarding gói Starter', desc: 'Onboarding Acme Logistics lên gói Starter — tạo workspace, nhập người dùng…', star: true },
  { code: 'JOB-2026-0004', name: 'Quickdraw Print — Onboarding gói Enterprise', desc: 'Onboarding Quickdraw Print lên gói Enterprise — tạo workspace, nhập…' },
  { code: 'JOB-2026-0007', name: 'Lumen Health — Onboarding gói Business', desc: 'Onboarding Lumen Health lên gói Business — tạo workspace, nhập…' },
]
const DONE: Job[] = [
  { code: 'JOB-2026-0032', name: 'Dovetail Carpentry — Onboarding gói Enterprise', desc: 'Onboarding Dovetail Carpentry lên gói Enterprise — tạo workspace…', who: 'H' },
  { code: 'JOB-2026-0033', name: 'Helios Pharma — Onboarding gói Starter', desc: 'Onboarding Helios Pharma lên gói Starter — tạo workspace, nhập người dùng…', who: 'E' },
]

const STAGES: { name: string; tone: string; jobs: Job[] }[] = [
  { name: 'CẦN LÀM', tone: 'grey', jobs: TODO },
  { name: 'ĐANG CHẠY', tone: 'blue', jobs: [] },
  { name: 'DUYỆT', tone: 'violet', jobs: [] },
  { name: 'HOÀN THÀNH', tone: 'green', jobs: DONE },
  { name: 'ĐÃ HỦY', tone: 'red', jobs: [] },
]

const FLOWS = ['Quản lý đơn hàng ticket', 'Quy trình onboarding khách hàng', 'Ra mắt workflow trực tiếp', 'Cập nhật gói đăng ký', 'Phản hồi khách hàng']

function JobCard({ job, done }: { job: Job; done?: boolean }) {
  return (
    <div className={`mk-wf-job${done ? ' done' : ''}`}>
      <div className="top"><i className="cb" /><code>{job.code}</code>{job.star ? <Star size={15} className="star on" fill="currentColor" /> : <Star size={15} className="star" />}</div>
      <b>{job.name}</b>
      <p>{job.desc}</p>
      {done
        ? <div className="foot"><Av p={job.who ?? 'E'} size={20} /><span>{job.who === 'H' ? 'Hazel' : 'Eric'}</span><em>Hoàn thành</em></div>
        : <div className="pend"><AlertCircle size={13} />Chờ phân công<span>Phân công</span></div>}
    </div>
  )
}

/** The Workflows app sidebar, Customer Success opened on its onboarding process. */
export function WorkflowsSide() {
  return (
    <div className="mk-side">
      <div className="title"><Workflow size={15} />Workflow</div>
      <SideRow icon={<Briefcase size={15} />} label="Việc của tôi" />
      <SideRow icon={<Bookmark size={15} />} label="Đã lưu" />
      <Sec>WORKFLOW <Search size={13} /></Sec>
      <div className="row open"><span className="ltr" style={{ background: '#EA580C' }}>C</span><span className="blue">Customer Success…</span><ChevronDown size={13} className="chev" /></div>
      {FLOWS.map(f => <div key={f} className={`row sub${f.startsWith('Quy trình onboarding') ? ' on' : ''}`}><i className="bullet" />{f}</div>)}
      <SideRow ltr="G" color="#16A34A" label="Nhóm Growth" chev />
      <SideRow ltr="H" color="#2563EB" label="Nhân sự & Pháp chế" chev />
      <SideRow ltr="P" color="#DB2777" label="Sản phẩm" chev />
    </div>
  )
}

export function WorkflowJobsMock() {
  return (
    <div className="mk-pf mk-wf">
      <TopBar />
      <div className="mk-app">
        <WorkflowsSide />

        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb" style={{ fontSize: 15 }}>Quy trình onboarding khách hàng <ChevronDown size={13} className="sep" /> <Bookmark size={14} className="sep" /> <ChevronRight size={14} className="sep" /></span>
            <span className="mk-wf-tabs"><span className="on">Lượt chạy</span><span>Nhóm</span><span>Tự động hóa</span><span>Báo cáo</span><span>Trình dựng</span><span>Cài đặt</span></span>
            <span className="mk-pf-quick" style={{ marginLeft: 'auto', width: 220 }}><Search size={14} />Tìm lượt chạy…</span>
            <span className="mk-btn" style={{ marginLeft: 8 }}><Plus size={15} />Lượt chạy mới</span>
          </div>
          <div className="mk-subhead">
            <span className="mk-tab on">Kanban</span>
            <span className="mk-tab">Bảng</span>
            <span className="mk-wf-acts"><span><Plus size={14} />Tạo view</span><span><ArrowUpDown size={14} />Sắp xếp</span><span><SlidersHorizontal size={14} />Quản lý view</span><span><Filter size={14} />Lọc nâng cao</span><MoreHorizontal size={15} /></span>
          </div>
          <div className="mk-wf-board">
            {STAGES.map(s => (
              <div key={s.name} className="col">
                <div className={`sh ${s.tone}`}><em>{s.jobs.length}</em><b>{s.name}</b><ChevronRight size={14} className="arr" /></div>
                {s.jobs.length === 0
                  ? <div className="empty">Chưa có lượt chạy</div>
                  : s.jobs.map(j => <JobCard key={j.code} job={j} done={s.name === 'HOÀN THÀNH'} />)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
