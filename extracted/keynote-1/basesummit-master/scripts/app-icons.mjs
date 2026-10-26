// Writes src/mocks/apps.generated.ts — the platform's app launcher (the
// Applications tab of the Company dialog) as data the deck can draw offline:
// every launcher-visible app, bucketed by group in platform.json order, each
// with its mark already rendered as the svg the public app's /fav endpoint
// would serve. Re-run after platform.json, an app's colours or a raw glyph
// change:
//   node scripts/app-icons.mjs
//
// Sources (read, never written):
//   C:/ai/apps/platform/platform.json                       apps + groups
//   C:/ai/apps/platform/frontend/brand/app-icon-colors.js   per-app gradients
//   C:/ai/apps/public/fav/builder.mjs                       the favicon builder
//   C:/ai/apps/public/fav/apps/{appkey}.svg                 raw glyphs
import { readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const PLATFORM = 'C:/ai/apps/platform'
const PUBLIC = 'C:/ai/apps/public'
const OUT = new URL('../src/mocks/apps.generated.ts', import.meta.url)

const { faviconSvg } = await import(pathToFileURL(`${PUBLIC}/fav/builder.mjs`).href)
const { APP_ICON_COLORS } = await import(pathToFileURL(`${PLATFORM}/frontend/brand/app-icon-colors.js`).href)
const config = JSON.parse(await readFile(`${PLATFORM}/platform.json`, 'utf-8'))

/* ── The group palette, mirrored from platform/frontend/brand/AppIcon.jsx ──
   (that file is JSX and imports the browser link module, so it cannot be
   imported here). An app with its own entry in app-icon-colors.js wins; the
   rest take their group's pair; a group with no theme cycles the HSL set. */
const GROUP_THEMES = {
  finops:       { colors: ['#16A34A', '#087F4E'] },
  peopleops:    { colors: ['#12A576', '#0C6F94'] },
  marketingops: { colors: ['#D81F9C', '#A020C0'], style: 'radial' },
  salesops:     { colors: ['#10A95A', '#21AECF'] },
  workops:      { colors: ['#3E7DE0', '#2C54D0'] },
  aiops:        { colors: ['#9D5CE6', '#3A54D6'] },
  comops:       { colors: ['#EA6D0E', '#C42A6E'] },
  workforce:    { colors: ['#22B89A', '#2A5AD4'] },
  platform:     { colors: ['#7B8AA2', '#515B79'] },
}
const FALLBACK_THEMES = [
  { h1: 258, h2: 288, s: 60 }, { h1: 180, h2: 205, s: 60 },
  { h1: 300, h2: 328, s: 54 }, { h1: 96,  h2: 122, s: 58 },
]
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
function hslRgb(h, s, l) {
  h = ((h % 360) + 360) % 360
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = l - c / 2
  const [r, g, b] = (
    h < 60  ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] :
    h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]
  )
  return [r + m, g + m, b + m]
}
const hex2 = v => Math.round(v * 255).toString(16).padStart(2, '0')
const relLum = ([r, g, b]) => {
  const f = v => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
function hueAtLuminance(h, s, targetY) {
  s = clamp(s, 0, 100) / 100
  let lo = 0, hi = 1
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2
    if (relLum(hslRgb(h, s, mid)) < targetY) lo = mid; else hi = mid
  }
  const [r, g, b] = hslRgb(h, s, (lo + hi) / 2)
  return '#' + hex2(r) + hex2(g) + hex2(b)
}
function hash(str) {
  let h = 0x811c9dc5
  for (let i = 0; i < (str || '').length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0 }
  return h
}
function gradientOf(appkey, group) {
  const own = APP_ICON_COLORS[appkey]
  if (own?.colors) return [...own.colors]
  const t = GROUP_THEMES[group] || FALLBACK_THEMES[hash(group || appkey) % FALLBACK_THEMES.length]
  if (t.colors) return [...t.colors]
  const variant = 10 + (hash(appkey) % 20)
  const dir = Math.sign(((t.h2 - t.h1 + 540) % 360) - 180) || 1
  const h3 = t.h1 === t.h2 ? t.h2 : t.h2 + dir * variant
  return [hueAtLuminance(t.h1, t.s, 0.32), hueAtLuminance(t.h2, t.s, 0.26), hueAtLuminance(h3, clamp(t.s - 6, 0, 100), 0.21)]
}
const styleOf = (appkey, group) => APP_ICON_COLORS[appkey]?.style || GROUP_THEMES[group]?.style || 'linear'
const angleOf = appkey => { const a = APP_ICON_COLORS[appkey]?.angle; return Number.isFinite(a) ? a : null }
const isolatedOf = appkey => !!APP_ICON_COLORS[appkey]?.isolated

/* ── The launcher's own filter (platform/frontend/services/apps.js) ─────── */
const clean = s => String(s || '').replace(/\{\{|\}\}/g, '').replace(/&amp;/g, '&')
const hiddenGroups = new Set((config.groups || []).filter(g => g?.hidden && g.key).map(g => g.key))
const visible = (config.apps || []).filter(a => !a.hidden && !(a.group && hiddenGroups.has(a.group)) && !a.internal)

const groups = new Map()
for (const g of config.groups || []) {
  if (hiddenGroups.has(g.key)) continue
  groups.set(g.key, { key: g.key, name: clean(g.name) || g.key, apps: [] })
}
const orphans = []
for (const app of visible) {
  const bucket = app.group ? groups.get(app.group) : null
  if (bucket) bucket.apps.push(app); else orphans.push(app)
}
const sections = [...groups.values()].filter(g => g.apps.length > 0)
if (orphans.length) sections.push({ key: '__other__', name: 'More', apps: orphans })

const defaultRaw = await readFile(`${PUBLIC}/fav/default.svg`, 'utf-8')
const missing = []
async function markOf(app) {
  let raw
  try { raw = await readFile(`${PUBLIC}/fav/apps/${app.key}.svg`, 'utf-8') }
  catch { raw = defaultRaw; missing.push(app.key) }
  return faviconSvg(raw, gradientOf(app.key, app.group), '#ffffff', styleOf(app.key, app.group), angleOf(app.key), isolatedOf(app.key))
    .replace(/\s+/g, ' ')
}

const out = []
for (const s of sections) {
  const apps = []
  for (const a of s.apps) apps.push({ key: a.key, name: clean(a.name) || a.key, title: clean(a.title), svg: await markOf(a) })
  out.push({ key: s.key, name: s.name, apps })
}

const q = s => JSON.stringify(s)
const lines = [
  '/* Generated by scripts/app-icons.mjs from the platform registry — do not edit.',
  ' * Every launcher-visible app in platform.json group order, each with its mark',
  ' * rendered as the svg the public app serves at /fav/{appkey}. */',
  '',
  'export interface AppTile { key: string; name: string; title: string; svg: string }',
  'export interface AppGroup { key: string; name: string; apps: AppTile[] }',
  '',
  'export const APP_GROUPS: AppGroup[] = [',
]
for (const g of out) {
  lines.push(`  { key: ${q(g.key)}, name: ${q(g.name)}, apps: [`)
  for (const a of g.apps) lines.push(`    { key: ${q(a.key)}, name: ${q(a.name)}, title: ${q(a.title)}, svg: ${q(a.svg)} },`)
  lines.push('  ] },')
}
lines.push(']', '')
await writeFile(OUT, lines.join('\n'), 'utf-8')

const n = out.reduce((s, g) => s + g.apps.length, 0)
console.log(`wrote ${n} apps in ${out.length} groups → src/mocks/apps.generated.ts`)
for (const g of out) console.log(`  ${g.key.padEnd(14)} ${String(g.apps.length).padStart(2)}  ${g.apps.map(a => a.key).join(' ')}`)
if (missing.length) console.log(`no raw glyph (default spark used): ${missing.join(', ')}`)
