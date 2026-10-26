import { useEffect, useState } from 'react'

/** Every family here is installed locally (variable where the family ships one)
 *  — a keynote must not depend on a CDN answering in the hall. */
export interface FontChoice {
  id: string
  label: string
  /** What it is good for, shown under the name. */
  note: string
  stack: string
}

export const DISPLAY_FONTS: FontChoice[] = [
  { id: 'bevietnam', label: 'Be Vietnam Pro', note: 'Geometric — the deck default', stack: "'Be Vietnam Pro', 'Segoe UI', system-ui, sans-serif" },
  { id: 'sora', label: 'Sora', note: 'Geometric, wide', stack: "'Sora Variable', 'Segoe UI', system-ui, sans-serif" },
  { id: 'space', label: 'Space Grotesk', note: 'Technical, slightly odd', stack: "'Space Grotesk Variable', 'Segoe UI', system-ui, sans-serif" },
  { id: 'outfit', label: 'Outfit', note: 'Rounder, softer geometry', stack: "'Outfit Variable', 'Segoe UI', system-ui, sans-serif" },
  { id: 'newsreader', label: 'Newsreader', note: 'Serif — editorial, quieter', stack: "'Newsreader Variable', Georgia, serif" },
  { id: 'afacad', label: 'Afacad', note: 'Narrow, humanist — fits long headlines', stack: "'Afacad Variable', 'Segoe UI', system-ui, sans-serif" },
]

export const TEXT_FONTS: FontChoice[] = [
  { id: 'inter', label: 'Inter', note: 'Neutral screen face — the deck default', stack: "'Inter Variable', 'Segoe UI', system-ui, sans-serif" },
  { id: 'manrope', label: 'Manrope', note: 'A touch warmer, rounder', stack: "'Manrope Variable', 'Segoe UI', system-ui, sans-serif" },
  { id: 'source', label: 'Source Sans 3', note: 'Humanist, easy at small sizes', stack: "'Source Sans 3 Variable', 'Segoe UI', system-ui, sans-serif" },
  { id: 'dmsans', label: 'DM Sans', note: 'Low-contrast geometric, quiet at length', stack: "'DM Sans Variable', 'Segoe UI', system-ui, sans-serif" },
  { id: 'space', label: 'Space Grotesk', note: 'Matches the display face', stack: "'Space Grotesk Variable', 'Segoe UI', system-ui, sans-serif" },
]

export interface RatioChoice {
  id: string
  label: string
  note: string
  /** The stage is always 1920 wide; the ratio sets its height. */
  height: number
}

/** Every slide is composed on a 1920-wide stage, so a ratio only changes how
 *  much vertical room the layout has: 16:9 gives 120px more, 3:1 takes 320px
 *  away and the type scale tightens to match. */
export const RATIOS: RatioChoice[] = [
  { id: '2x1', label: '2 : 1', note: 'The deck default — 1920 × 960', height: 960 },
  { id: '16x9', label: '16 : 9', note: 'Fills a normal projector — 1920 × 1080', height: 1080 },
  { id: '3x1', label: '3 : 1', note: 'Wide and short — 1920 × 640', height: 640 },
]

export const STAGE_WIDTH = 1920
export const stageHeight = (ratio: string) => (RATIOS.find(r => r.id === ratio) ?? RATIOS[0]).height

export interface ThemeChoice {
  id: string
  label: string
  note: string
  /** Ground, structure, accent — for the swatch in the panel. */
  swatch: [string, string, string]
}

export const THEMES: ThemeChoice[] = [
  { id: 'blue', label: 'Blue', note: 'Deep navy ground, electric blue structure', swatch: ['#051433', '#2F7BFF', '#5EE7FF'] },
  { id: 'green', label: 'Green', note: 'Green ground, clean green structure', swatch: ['#053318', '#22C55E', '#56DCFF'] },
  { id: 'violet', label: 'Violet', note: 'Indigo ground, violet structure', swatch: ['#150C34', '#7C5CFF', '#6FE8FF'] },
]

export type ProgressMode = 'show' | 'hide'

export interface ProgressChoice {
  id: ProgressMode
  label: string
  note: string
}

/** The strip of one segment per slide. Shown, it runs along the foot of the
 *  stage in every window. Hidden, it leaves the slides: the build view keeps
 *  it as a strip across the top of the page, and presenting shows none. */
export const PROGRESS: ProgressChoice[] = [
  { id: 'show', label: 'Show', note: 'Along the foot of every slide — the default' },
  { id: 'hide', label: 'Hide', note: 'Top of the page while building; none when presenting' },
]

export interface Settings {
  theme: string
  display: string
  text: string
  ratio: string
  progress: ProgressMode
}

export const DEFAULTS: Settings = { theme: 'blue', display: 'bevietnam', text: 'inter', ratio: '2x1', progress: 'show' }

const KEY = 'base.settings'
const EVENT = 'base:settings'

/** Bumped when a default changes meaning; older saves are migrated on read. */
const VERSION = 3

/** What this browser saved. Only the keys that still exist are kept, so a save
 *  from before the brand and language choices were dropped reads cleanly. */
function readSaved(): Settings {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? '{}') as Partial<Settings> & { v?: number }
    const s: Settings = { ...DEFAULTS }
    if (typeof saved.theme === 'string') s.theme = saved.theme === 'jade' ? 'green' : saved.theme   // the green theme's earlier name
    if (typeof saved.display === 'string') s.display = saved.display
    if (typeof saved.text === 'string') s.text = saved.text
    if (typeof saved.ratio === 'string') s.ratio = saved.ratio
    if (PROGRESS.some(p => p.id === saved.progress)) s.progress = saved.progress as ProgressMode
    if (!THEMES.some(t => t.id === s.theme)) s.theme = DEFAULTS.theme
    if (!DISPLAY_FONTS.some(f => f.id === s.display)) s.display = DEFAULTS.display
    if (!TEXT_FONTS.some(f => f.id === s.text)) s.text = DEFAULTS.text
    if (!RATIOS.some(r => r.id === s.ratio)) s.ratio = DEFAULTS.ratio
    return s
  } catch { return DEFAULTS }
}

/** The saved settings. */
export function readSettings(): Settings {
  return readSaved()
}

/** Writes the choice onto the root element. Everything else — slides, figures,
 *  panels, both presenting windows — reads it through the tokens. */
export function applySettings(s: Settings) {
  const root = document.documentElement
  root.dataset.theme = s.theme
  root.dataset.ratio = s.ratio
  root.style.setProperty('--stage-w', `${STAGE_WIDTH}px`)
  root.style.setProperty('--stage-h', `${stageHeight(s.ratio)}px`)
  root.style.setProperty('--stage-ar', String(STAGE_WIDTH / stageHeight(s.ratio)))
  root.style.setProperty('--font-display', (DISPLAY_FONTS.find(f => f.id === s.display) ?? DISPLAY_FONTS[0]).stack)
  root.style.setProperty('--font-body', (TEXT_FONTS.find(f => f.id === s.text) ?? TEXT_FONTS[0]).stack)
}

export function saveSettings(s: Settings) {
  try { localStorage.setItem(KEY, JSON.stringify({ ...s, v: VERSION })) } catch { /* private mode */ }
  applySettings(s)
  window.dispatchEvent(new CustomEvent(EVENT))
}

/** Live settings. `storage` catches the other presenting window, so changing
 *  the theme on the laptop restyles the projector too. */
export function useSettings() {
  const [s, setS] = useState<Settings>(readSettings)
  useEffect(() => {
    const sync = () => { const v = readSettings(); setS(v); applySettings(v) }
    window.addEventListener(EVENT, sync)
    window.addEventListener('storage', sync)
    return () => { window.removeEventListener(EVENT, sync); window.removeEventListener('storage', sync) }
  }, [])
  return [s, (patch: Partial<Settings>) => saveSettings({ ...readSaved(), ...patch })] as const
}
