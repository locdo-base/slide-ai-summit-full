import { useState } from 'react'
import type { Keynote } from './types'
import { ConfigPanel } from './ConfigPanel'

export function Launcher({ keynotes }: { keynotes: Keynote[] }) {
  const [config, setConfig] = useState(false)
  const preview = keynotes.find(k => !k.soon && k.slides.length)?.slides[0]

  return (
    <div className="launcher">
      <div className="launcher-inner">
        <div className="launcher-top">
          <div>
            <h1>AI Summit 2026</h1>
            <div className="sub">Keynotes</div>
          </div>
          <div className="launcher-actions">
            <button className="launcher-config" onClick={() => { location.hash = '#/resources' }} title="Every product window the decks show, 1:1">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" /><rect x="9" y="1.5" width="5.5" height="5.5" rx="1" />
                <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" /><rect x="9" y="9" width="5.5" height="5.5" rx="1" />
              </svg>
              Resources
            </button>
            <button className="launcher-config" onClick={() => setConfig(true)}>
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 10.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
                <path d="M8 1.5v1.75M8 12.75v1.75M2.5 8H1M15 8h-1.5M4.1 4.1 3 3M13 13l-1.1-1.1M11.9 4.1 13 3M3 13l1.1-1.1" />
              </svg>
              Slide config
            </button>
          </div>
        </div>
        <ul>
          {keynotes.map(k => (
            <li key={k.id} className={k.soon ? 'soon' : undefined}>
              <a href={k.soon ? undefined : `#/${k.id}/1`}>
                <span>{k.title}</span>
                <small>{k.soon ? 'in preparation' : `${k.slides.length} slide${k.slides.length === 1 ? '' : 's'}`}</small>
              </a>
            </li>
          ))}
        </ul>
        <div className="keys">
          <kbd>→</kbd> <kbd>space</kbd> <kbd>click</kbd> next build &nbsp;&nbsp; <kbd>←</kbd> back &nbsp;&nbsp;
          <kbd>s</kbd> slide list &nbsp;&nbsp; <kbd>n</kbd> speaker notes &nbsp;&nbsp; <kbd>r</kbd> replay slide &nbsp;&nbsp;
          <kbd>p</kbd> presenter view on two screens &nbsp;&nbsp;
          <kbd>f</kbd> fullscreen &nbsp;&nbsp; <kbd>h</kbd> clean view &nbsp;&nbsp; <kbd>esc</kbd> this list
        </div>
      </div>
      {config && <ConfigPanel preview={preview} onClose={() => setConfig(false)} />}
    </div>
  )
}
