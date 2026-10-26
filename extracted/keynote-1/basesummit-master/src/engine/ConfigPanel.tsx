import { useEffect } from 'react'
import type { SlideDef } from './types'
import { SlidePreview } from './SlidePreview'
import { DEFAULTS, DISPLAY_FONTS, PROGRESS, RATIOS, TEXT_FONTS, THEMES, useSettings } from '../theme/settings'

interface Props {
  /** A real slide, rendered live so a choice can be judged on the work itself. */
  preview?: SlideDef
  onClose: () => void
}

/** The side peek off the keynote list: ratio, theme and type for every deck.
 *  Choices are saved to this browser and picked up by both presenting windows. */
export function ConfigPanel({ preview, onClose }: Props) {
  const [settings, set] = useSettings()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); onClose() } }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose])

  return (
    <>
      <div className="peek-scrim" onClick={onClose} />
      <aside className="peek" role="dialog" aria-label="Slide config">
        <header className="peek-head">
          <h2>Slide config</h2>
          <button className="ctl ctl-sm" onClick={onClose} title="Close (esc)" aria-label="Close">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M4 4l8 8M12 4l-8 8" /></svg>
          </button>
        </header>

        <div className="peek-body">
          {preview && (
            <div className="peek-preview">
              <SlidePreview key={`${settings.theme}:${settings.display}:${settings.text}:${settings.ratio}`} component={preview.component} title={preview.title} crumb={preview.crumb} step={0} still />
            </div>
          )}

          <section className="peek-group">
            <h3>Aspect ratio<em>1920 wide, the height follows</em></h3>
            <div className="peek-ratios">
              {RATIOS.map(r => (
                <button
                  key={r.id} className="peek-ratio" data-on={settings.ratio === r.id}
                  onClick={() => set({ ratio: r.id })} title={r.note}
                >
                  <span className="peek-ratio-box" style={{ aspectRatio: `1920 / ${r.height}` }} />
                  <b>{r.label}</b>
                </button>
              ))}
            </div>
            <p className="peek-note">{RATIOS.find(r => r.id === settings.ratio)?.note}</p>
          </section>

          <section className="peek-group">
            <h3>Colour theme</h3>
            <div className="peek-themes">
              {THEMES.map(t => (
                <button
                  key={t.id} className="peek-theme" data-on={settings.theme === t.id}
                  onClick={() => set({ theme: t.id })} title={t.note}
                >
                  <span className="peek-swatch">
                    {t.swatch.map(c => <i key={c} style={{ background: c }} />)}
                  </span>
                  <b>{t.label}</b>
                  <small>{t.note}</small>
                </button>
              ))}
            </div>
          </section>

          <section className="peek-group">
            <h3>Display font<em>headlines and slide titles</em></h3>
            {DISPLAY_FONTS.map(f => (
              <button
                key={f.id} className="peek-font" data-on={settings.display === f.id}
                onClick={() => set({ display: f.id })}
              >
                <b style={{ fontFamily: f.stack }}>{f.label}</b>
                <small>{f.note}</small>
              </button>
            ))}
          </section>

          <section className="peek-group">
            <h3>Text font<em>body copy, labels, figures</em></h3>
            {TEXT_FONTS.map(f => (
              <button
                key={f.id} className="peek-font" data-on={settings.text === f.id}
                onClick={() => set({ text: f.id })}
              >
                <b style={{ fontFamily: f.stack }}>{f.label}</b>
                <small style={{ fontFamily: f.stack }}>{f.note}</small>
              </button>
            ))}
          </section>

          <section className="peek-group">
            <h3>Progress bar<em>one segment per slide</em></h3>
            <div className="peek-pair">
              {PROGRESS.map(p => (
                <button
                  key={p.id} className="peek-font peek-pair-item" data-on={settings.progress === p.id}
                  onClick={() => set({ progress: p.id })}
                >
                  <b>{p.label}</b>
                  <small>{p.note}</small>
                </button>
              ))}
            </div>
          </section>
        </div>

        <footer className="peek-foot">
          <span>Saved to this browser · both presenting windows follow</span>
          <button className="pres-btn" onClick={() => set(DEFAULTS)}>Reset</button>
        </footer>
      </aside>
    </>
  )
}
