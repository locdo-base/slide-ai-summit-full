import { useEffect, useState } from 'react'
import { Search, ChevronRight, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { TopBar } from './Window'
import { Pill } from './parts'
import { WorkforceSide } from './PlatformMocks'
import { SettingsDialog, FieldsPage } from './PipelineSettingsMock'
import { useWalk, type WalkStep } from '../ui/Walk'

/* The data field model, as two screens walked on a timer: first the field
   registry in Workforce — every custom field in the company, once, with the
   services that use it — then the same fields configured inside one service,
   the Sales Pipeline's settings › Data fields. Inside a <Walk> the slide
   drives it; alone it runs its own timer. */
type Key = 'registry' | 'service'
export const FIELDS_WALK: (WalkStep & { key: Key })[] = [
  { key: 'registry', name: 'Danh mục trường thống nhất', ms: 3800 },
  { key: 'service', name: 'Theo từng service', ms: 3800 },
]

const Ghost = ({ children }: { children: React.ReactNode }) => <span className="mk-btn ghost" style={{ marginLeft: 0 }}>{children}</span>

const REG: { name: string; type: string; key: string; used: string[]; global?: boolean }[] = [
  { name: 'Quốc gia', type: 'Lựa chọn', key: 'custom_country', used: ['Sales pipeline', 'Khách hàng', 'Đề nghị thanh toán'], global: true },
  { name: 'Loại deal', type: 'Lựa chọn', key: 'custom_deal_type', used: ['Sales pipeline'], global: true },
  { name: 'Tư vấn kinh doanh', type: 'Người dùng', key: 'custom_business_consultant', used: ['Sales pipeline', 'Đào tạo khách hàng'], global: true },
  { name: 'Ngành', type: 'Văn bản', key: 'custom_industry', used: ['Sales pipeline', 'Khách hàng', 'Bài viết'], global: true },
  { name: 'Quy mô công ty', type: 'Lựa chọn', key: 'custom_company_size', used: ['Sales pipeline', 'Khách hàng'], global: true },
  { name: 'Khu vực', type: 'Lựa chọn', key: 'custom_region', used: ['Sales pipeline', 'Khách hàng', 'Nghiên cứu'], global: true },
  { name: 'Giá trị hợp đồng', type: 'Tiền tệ', key: 'custom_contract_value', used: ['Sales pipeline', 'Đào tạo khách hàng'] },
  { name: 'Trung tâm chi phí', type: 'Lựa chọn', key: 'custom_cost_center', used: ['Đề nghị thanh toán', 'Nhân sự & Tuyển dụng'], global: true },
  { name: 'Độ ưu tiên', type: 'Lựa chọn', key: 'custom_priority', used: ['Chung', 'Nội dung', 'Biên dịch'] },
  { name: 'Nguồn', type: 'Lựa chọn', key: 'custom_source', used: ['Sales pipeline', 'Bài viết'] },
  { name: 'Ngày gia hạn', type: 'Ngày', key: 'custom_renewal_date', used: ['Sales pipeline', 'Đào tạo khách hàng'] },
]

function RegistryScreen() {
  return (
    <div className="mk-pf">
      <TopBar />
      <div className="mk-app">
        <WorkforceSide active="fields" />
        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb" style={{ fontSize: 16 }}>Trường dữ liệu <span style={{ fontWeight: 500, color: 'var(--mk-muted)', fontSize: 13 }}>tổng 24</span></span>
            <span className="mk-pf-quick" style={{ marginLeft: 'auto', width: 300 }}><Search size={14} />Tìm trường…</span>
            <Ghost>Bộ lọc <ChevronRight size={13} /></Ghost>
          </div>
          <div className="mk-fr">
            <table>
              <thead><tr><th>Trường</th><th>Loại</th><th>Service sử dụng</th><th>Mã</th><th>Phạm vi</th></tr></thead>
              <tbody>
                {REG.map(f => (
                  <tr key={f.key}>
                    <td><span className="fld"><i><SlidersHorizontal size={16} /></i><b>{f.name}</b></span></td>
                    <td>{f.type}</td>
                    <td><span className="used">{f.used.map(u => <span key={u}>{u}</span>)}</span></td>
                    <td><code>{f.key}</code></td>
                    <td>{f.global ? <Pill kind="medium">CHUNG</Pill> : <Pill kind="grey">SERVICE</Pill>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export function FieldsWalkMock() {
  const reduce = useReducedMotion()
  const walk = useWalk()
  const [own, setOwn] = useState(0)
  useEffect(() => {
    if (walk || reduce) return
    const t = setTimeout(() => setOwn((own + 1) % FIELDS_WALK.length), FIELDS_WALK[own].ms)
    return () => clearTimeout(t)
  }, [own, walk, reduce])
  const key: Key = walk ? FIELDS_WALK[walk.index].key : reduce ? 'registry' : FIELDS_WALK[own].key

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={key}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}>
          {key === 'registry'
            ? <RegistryScreen />
            : <SettingsDialog page="fields"><div className="mk-ps-page"><FieldsPage /></div></SettingsDialog>}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
