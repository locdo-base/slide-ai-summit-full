import { Check, Loader2, Database, Globe, Copy, Sparkles, ArrowRight, Terminal } from 'lucide-react'
import { useBrand } from '../ui/Brand'
import { ramp } from '../fx/ScenePlayer'
import './studio.css'

/* The two scenes after the builds: what AI Studio is not (a Claude Code
   replacement) and the two special supports — publish to the platform at
   once, a database on request. */

/** Studio → Base.vn → Claude Code | Codex: the three hand-offs, drawn in turn. */
export function Beyond({ t }: { t: number }) {
  const { wordmark } = useBrand()// `t` is the scene clock here
  const nodes = [
    { at: 0.3, Icon: Sparkles, name: 'AI Studio', line: 'Bản v0 — tạo nhanh, tích hợp sẵn, hiểu dữ liệu của bạn', tone: 'violet' },
    { at: 1.5, Icon: Database, name: wordmark, line: 'Dữ liệu, services, tính toán & phân tích — dễ dàng kết nối', tone: 'blue' },
    { at: 2.7, Icon: Terminal, name: 'Claude Code · Codex', line: 'Tiếp tục phát triển — tương thích hoàn toàn', tone: 'cyan' },
  ]
  return (
    <div className="beyond">
      <div className="chain">
        {nodes.map((n, k) => (
          <div key={n.name} style={{ display: 'contents' }}>
            {k > 0 && (
              <div className="arrow" style={{ opacity: ramp(t, n.at - 0.5, 0.5) }}>
                <i style={{ transform: `scaleX(${ramp(t, n.at - 0.5, 0.6)})` }} /><ArrowRight size={24} />
              </div>
            )}
            <div className={`node ${n.tone}`} style={{ opacity: ramp(t, n.at, 0.6), transform: `translateY(${(1 - ramp(t, n.at, 0.6)) * 16}px)` }}>
              <span className="ic"><n.Icon size={28} /></span>
              <b>{n.name}</b>
              <span>{n.line}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Publish now, and a database when you need one — two panes that act out
 *  their own click. */
export function Supports({ t }: { t: number }) {
  const { domain } = useBrand()
  const host = `platform.${domain}`
  const pubPressed = t >= 2.2, pubLive = t >= 3.8
  const dbPicked = t >= 6.4, dbPressed = t >= 8.0, dbReady = t >= 9.8
  return (
    <div className="supports">
      <div className="mk-window sup-pane" style={{ opacity: ramp(t, 0.2, 0.6), transform: `translateY(${(1 - ramp(t, 0.2, 0.6)) * 16}px)` }}>
        <div className="mk-pane">
          <div className="ph"><Globe size={15} />Publish <span className="sub">Sales pipeline report</span><span className="right">{pubLive ? <span className="mk-pill green"><Check size={11} />Live</span> : <span className="mk-pill grey">Draft · v3</span>}</span></div>
          <div className="pb sup-form">
            <label>Destination<b>{host} · Base Inc workspace</b></label>
            <label>Address<b>{host}/apps/<span>sales-pipeline</span></b></label>
            <label>Who can open it<b>Everyone at Base Inc, signed in · Sales team pinned</b></label>
            <label>Data access<b>Reads {'{'}deals, pipelines, owners{'}'} as the viewer</b></label>
            <div className={`sup-btn${pubPressed ? ' pressed' : ''}${pubLive ? ' done' : ''}`}>
              {pubLive ? <><Check size={14} />Published</> : pubPressed ? <><Loader2 size={14} className="spin" />Publishing…</> : 'Publish now'}
            </div>
            <div className="sup-result" style={{ opacity: pubLive ? 1 : 0 }}>
              <Globe size={13} /><span>https://{host}/apps/sales-pipeline · live for 412 people</span><Copy size={13} />
            </div>
          </div>
        </div>
        <div className="sup-toast" style={{ transform: `translateX(${pubLive && t < 7.5 ? 0 : 120}%)` }}><i><Check size={14} /></i>Live on {host} · in every launcher at Base Inc</div>
      </div>

      <div className="mk-window sup-pane" style={{ opacity: ramp(t, 0.5, 0.6), transform: `translateY(${(1 - ramp(t, 0.5, 0.6)) * 16}px)` }}>
        <div className="mk-pane">
          <div className="ph"><Database size={15} />Database <span className="sub">for this app</span><span className="right">{dbReady ? <span className="mk-pill green"><Check size={11} />Ready</span> : <span className="mk-pill grey">None yet</span>}</span></div>
          <div className="pb sup-form">
            <div className="sup-choice">
              <div className={dbPicked ? 'on' : ''}><i /><b>PostgreSQL 16</b><span>Managed · daily backups · PITR</span></div>
              <div><i /><b>MySQL 8.4</b><span>Managed · daily backups</span></div>
            </div>
            <label>Region<b>asia-southeast1 · Singapore · 38 ms from HCMC</b></label>
            <label>Size<b>2 vCPU · 4 GB RAM · 50 GB SSD · scales to 8 vCPU</b></label>
            <div className={`sup-btn${dbPressed ? ' pressed' : ''}${dbReady ? ' done' : ''}`}>
              {dbReady ? <><Check size={14} />Database ready</> : dbPressed ? <><Loader2 size={14} className="spin" />Provisioning…</> : 'Create database'}
            </div>
            <div className="sup-result" style={{ opacity: dbReady ? 1 : 0 }}>
              <Database size={13} /><span>postgres://sales_pipeline:••••••••@pg-7f3a.db.{domain}:5432/sales_pipeline</span><Copy size={13} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
