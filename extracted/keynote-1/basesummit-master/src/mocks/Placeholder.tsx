import { ImageIcon } from 'lucide-react'

/* Empty mode: the rectangle a screenshot will fill later. Eric supplies the
   captures; until one comes the slide shows its frame at the right size with
   the screen's name in the middle, so the layout, the leads and the cues can
   be judged now and the capture dropped in afterwards. */

interface Props {
  /** What the screen will show — "Service registry", "Sales pipeline". */
  label: string
  /** A second, quieter line — the app, the page. */
  sub?: string
  width?: number
  height?: number
}

export function EmptyScreen({ label, sub, width, height = 900 }: Props) {
  return (
    <div className="ph-screen" style={{ width, minHeight: height }}>
      <div className="ph-inner">
        <ImageIcon size={40} strokeWidth={1.4} />
        <b>{label}</b>
        {sub && <span>{sub}</span>}
        <small>screenshot to come</small>
      </div>
    </div>
  )
}
