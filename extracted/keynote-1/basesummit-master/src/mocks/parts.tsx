import type { ReactNode } from 'react'
import {
  CircleDot, ClipboardList, ClipboardCheck, Building2, BarChart3, Settings, ChevronRight, ChevronDown,
  Calendar, AlertTriangle, Bookmark, PanelRight,
} from 'lucide-react'

/* The landing's persona cast — the same people on every mock. */
export const PEOPLE: Record<string, { name: string; role: string; grad: string }> = {
  E: { name: 'Eric',   role: 'Founder & CEO',      grad: 'linear-gradient(135deg,#A78BFA,#7C3AED)' },
  D: { name: 'Daniel', role: 'Chuyên viên kinh doanh', grad: 'linear-gradient(135deg,#60A5FA,#2563EB)' },
  B: { name: 'Brian',  role: 'COO',                grad: 'linear-gradient(135deg,#CBD5E1,#475569)' },
  J: { name: 'Jane',   role: 'CFO',                grad: 'linear-gradient(135deg,#FDBA74,#EA580C)' },
  H: { name: 'Helen',  role: 'Trưởng phòng Nhân sự', grad: 'linear-gradient(135deg,#F9A8D4,#DB2777)' },
  K: { name: 'Duke',   role: 'Kỹ sư',              grad: 'linear-gradient(135deg,#6EE7B7,#059669)' },
  L: { name: 'Jolie',  role: 'Kỹ sư',              grad: 'linear-gradient(135deg,#A5B4FC,#4F46E5)' },
  Q: { name: 'Quinn',  role: 'Kỹ sư giải pháp',    grad: 'linear-gradient(135deg,#22D3EE,#0891B2)' },
  Z: { name: 'Hazel',  role: 'SDR',                grad: 'linear-gradient(135deg,#FCD34D,#D97706)' },
  V: { name: 'Kevin',  role: 'Chăm sóc khách hàng', grad: 'linear-gradient(135deg,#86EFAC,#16A34A)' },
}

export function Av({ p, size = 18, sq }: { p: string; size?: number; sq?: boolean }) {
  const who = PEOPLE[p]
  return <span className={`mk-av${sq ? ' sq' : ''}`} style={{ width: size, height: size, background: who?.grad ?? '#94A3B8', fontSize: size * 0.5 }}>{who?.name[0] ?? p}</span>
}

export function Who({ p }: { p: string }) {
  return <span className="who"><Av p={p} />{PEOPLE[p]?.name}</span>
}

/** A team chip: two-letter tile + name (the screenshot's "Building", "Network"). */
export function Team({ code, name, color = '#2563EB' }: { code: string; name: string; color?: string }) {
  return <span className="who"><span className="mk-av sq" style={{ background: color, width: 16, height: 16, fontSize: 7.5 }}>{code}</span>{name}</span>
}

export function Pill({ kind, children, caret }: { kind: string; children: ReactNode; caret?: boolean }) {
  return <span className={`mk-pill ${kind}`}>{children}{caret && <ChevronDown size={11} />}</span>
}
export const Overdue = () => <span className="mk-pill overdue"><AlertTriangle size={11} />Quá hạn</span>
export const Due = ({ d }: { d: string }) => <span className="due"><Calendar size={12} />{d}</span>

export function Status({ done, sm }: { done?: boolean; sm?: boolean }) {
  return <span className={`mk-status${done ? ' done' : ''}${sm ? ' sm' : ''}`} />
}

export function Tools({ pinned }: { pinned?: boolean }) {
  return <span className="tools"><Bookmark size={15} className={pinned ? 'on' : undefined} fill={pinned ? 'currentColor' : 'none'} /><PanelRight size={15} /></span>
}

/* ── Platform rail — which app is open ─────────────────────────────────── */
const RAIL = [
  { key: 'tasks', label: 'Công việc', Icon: CircleDot },
  { key: 'plans', label: 'Kế hoạch', Icon: ClipboardList },
  { key: 'assessment', label: 'Đánh giá', Icon: ClipboardCheck },
  { key: 'company', label: 'Công ty', Icon: Building2 },
]

export function Rail({ active = 'tasks', items = RAIL }: { active?: string; items?: { key: string; label: string; Icon: typeof CircleDot }[] }) {
  return (
    <div className="mk-rail">
      {items.map(({ key, label, Icon }) => (
        <div key={key} className={`tile${key === active ? ' on' : ''}`}><i><Icon size={17} /></i>{label}</div>
      ))}
      <div className="spacer" />
      <div className="foot"><BarChart3 size={16} /><Settings size={16} /></div>
    </div>
  )
}

/* ── App sidebar rows ──────────────────────────────────────────────────── */
export function SideRow({ icon, ltr, color, label, on, chev }: { icon?: ReactNode; ltr?: string; color?: string; label: string; on?: boolean; chev?: boolean }) {
  return (
    <div className={`row${on ? ' on' : ''}`}>
      {icon}
      {ltr && <span className="ltr" style={{ background: color }}>{ltr}</span>}
      <span>{label}</span>
      {chev && <ChevronRight size={13} className="chev" />}
    </div>
  )
}
export const Sec = ({ children }: { children: ReactNode }) => <div className="sec">{children}</div>
