/** Speaker notes are written as one line per beat. A line may open with a build
 *  marker — `[step 2]`, `[step]` (the next one) or `[2]` — which binds it to the
 *  build it belongs to; lines before any marker belong to the slide's opening
 *  state. The presenter panel lights the line for the build now on screen. */
export interface NoteLine {
  /** Build step this line belongs to; 0 = the slide's initial state. */
  step: number
  text: string
  /** First line of its step — the only one that carries the step chip. */
  head: boolean
}

const MARK = /^\[(?:step\s*)?(\d+)?\]\s*/i

export function parseNotes(notes: string | undefined, maxStep: number): NoteLine[] {
  if (!notes) return []
  const out: NoteLine[] = []
  let step = 0
  for (const raw of notes.split('\n')) {
    const line = raw.trim()
    if (!line) continue
    const m = line.match(MARK)
    if (m) step = Math.min(m[1] ? parseInt(m[1], 10) : step + 1, maxStep)
    out.push({ step, text: m ? line.slice(m[0].length).trim() : line, head: false })
  }
  const seen = new Set<number>()
  for (const l of out) {
    l.head = !seen.has(l.step)
    seen.add(l.step)
  }
  return out
}
