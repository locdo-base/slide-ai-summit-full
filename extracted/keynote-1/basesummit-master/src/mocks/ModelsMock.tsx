import { Settings, Cpu, BarChart3, Wrench, KeyRound, Building2, Plus } from 'lucide-react'
import { TopBar } from './Window'
import { Rail, SideRow, Sec, Pill } from './parts'
import { AGENTS_RAIL } from './AgentsParts'

interface M { name: string; id: string; caps: string[]; key?: string; def?: boolean; legacy?: boolean; setup?: boolean }

const BANDS: { vendor: string; n: string; tag: string; models: M[] }[] = [
  {
    vendor: 'Anthropic', n: '4/8 configured', tag: 'sk-ant-…', models: [
      { name: 'Claude Fable 5', id: 'claude-fable-5', caps: ['Frontier reasoning', 'Thinking', 'Tools', '1M ctx'], key: 'sk-ant-••••4f2a', def: true },
      { name: 'Claude Opus 5', id: 'claude-opus-5', caps: ['Strong reasoning', 'Thinking', 'Tools'], key: 'sk-ant-••••4f2a' },
      { name: 'Claude Sonnet 5', id: 'claude-sonnet-5', caps: ['Good reasoning', 'Tools', 'Speed'], key: 'sk-ant-••••4f2a' },
      { name: 'Claude Haiku 4.5', id: 'claude-haiku-4-5', caps: ['Speed', 'Tools'], setup: true },
    ],
  },
  {
    vendor: 'OpenAI', n: '1/5 configured', tag: 'sk-…', models: [
      { name: 'GPT-5.1', id: 'gpt-5.1', caps: ['Strong reasoning', 'Tools', 'Vision'], key: 'sk-••••9c1e' },
      { name: 'GPT-5 mini', id: 'gpt-5-mini', caps: ['Speed', 'Tools'], setup: true },
      { name: 'GPT Image 1', id: 'gpt-image-1', caps: ['Image gen'], setup: true },
      { name: 'Text Embedding 3 Large', id: 'text-embedding-3-large', caps: ['Embeddings'], setup: true },
    ],
  },
  {
    vendor: 'Google', n: '0/4 configured', tag: 'AIza…', models: [
      { name: 'Gemini 3 Pro', id: 'gemini-3-pro', caps: ['Strong reasoning', 'Vision', 'Audio'], setup: true },
      { name: 'Gemini 2.5 Flash', id: 'gemini-2.5-flash', caps: ['Speed', 'Vision'], setup: true },
      { name: 'Imagen 4', id: 'imagen-4', caps: ['Image gen'], setup: true },
      { name: 'Veo 3.1', id: 'veo-3.1', caps: ['Video gen'], setup: true },
    ],
  },
]

/* Settings › Models: the catalog, and which of it this person has a key for. */
export function ModelsMock() {
  let firstSetup = true
  return (
    <>
      <TopBar placeholder="Search agents…" />
      <div className="mk-app">
        <Rail active="settings" items={AGENTS_RAIL} />
        <div className="mk-side">
          <div className="title"><Settings size={15} />Settings</div>
          <SideRow icon={<Cpu size={15} />} label="Models" on />
          <SideRow icon={<BarChart3 size={15} />} label="Usage" />
          <SideRow icon={<Wrench size={15} />} label="Tools" />
          <SideRow icon={<Building2 size={15} />} label="Workspace" />
          <Sec>&nbsp;</Sec>
        </div>
        <div className="mk-main">
          <div className="mk-head">
            <span className="crumb">Models <span className="sep">·</span> <span style={{ fontWeight: 500, color: 'var(--mk-muted)' }}>17 models in the catalog · 5 configured for you</span></span>
            <span className="mk-btn ghost"><Plus size={14} />Custom model</span>
          </div>
          <div className="mk-filters">
            {['All', 'Vision', 'Image gen', 'Video gen', 'Audio', 'Embeddings', 'Extended thinking', 'Reasoning 4+'].map((f, i) => <span key={f} className={i === 0 ? 'on' : undefined}>{f}</span>)}
          </div>
          <div className="mk-usage" data-callout="usage">
            <div className="mk-stat"><span className="l">Total spend · 30d</span><span className="v">$312.40</span><span className="d">−8% vs last 30d</span></div>
            <div className="mk-stat"><span className="l">Requests</span><span className="v">4,812</span><span className="d">+14%</span></div>
            <div className="mk-stat"><span className="l">Total tokens</span><span className="v">18.4M</span><span className="d">+11%</span></div>
            <div className="mk-stat"><span className="l">Avg cost / request</span><span className="v">$0.065</span><span className="d">−19%</span></div>
          </div>
          {BANDS.map(b => (
            <div key={b.vendor} className="mk-band">
              <div className="bh">{b.vendor} <span className="n">{b.n}</span><span className="tag">keys look like {b.tag}</span></div>
              <div className="mk-models">
                {b.models.map(m => {
                  const mark = m.setup && firstSetup
                  if (mark) firstSetup = false
                  return (
                    <div key={m.id} className="mk-model">
                      <div className="n">{m.name}{m.def && <Pill kind="medium">Default</Pill>}{m.legacy && <Pill kind="grey">Legacy</Pill>}</div>
                      <div className="id">{m.id}</div>
                      <div className="caps">{m.caps.map(c => <span key={c}>{c}</span>)}</div>
                      <div className="kf">
                        {m.key ? <><KeyRound size={12} /><code>{m.key}</code><span className="acts">Make default · Edit key · Remove</span></>
                          : <>Not configured<span className="set" {...(mark ? { 'data-callout': 'setup' } : {})}><KeyRound size={12} />Set up</span></>}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          <div className="mk-band">
            <div className="bh">Local / Custom <span className="n">Self-hosted / OpenAI-compatible</span><span className="tag">no key required</span></div>
          </div>
        </div>
      </div>
    </>
  )
}
