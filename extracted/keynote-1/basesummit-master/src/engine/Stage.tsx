import { useEffect, useRef, useState, type ReactNode, type MouseEventHandler } from 'react'
import { STAGE_WIDTH, stageHeight, useSettings } from '../theme/settings'

/** The stage the deck is composed on: always 1920 wide, as tall as the chosen
 *  aspect ratio makes it. */
export function useStageSize() {
  const [settings] = useSettings()
  return { w: STAGE_WIDTH, h: stageHeight(settings.ratio) }
}

/** A fixed stage scaled uniformly to fit whatever room the deck leaves it — the
 *  presenter panels take their width off the stage rather than covering it.
 *  Placed at whole pixels from the top-left: centring with 50% and a -50%
 *  translate lands on a half pixel whenever the room is odd, and every glyph
 *  on the stage then straddles two pixel columns and reads blurred. */
export function Stage({ children, onClick }: { children: ReactNode; onClick?: MouseEventHandler }) {
  const ref = useRef<HTMLDivElement>(null)
  const { w, h } = useStageSize()
  const [fit, setFit] = useState({ scale: 1, x: 0, y: 0 })
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      const { width, height } = el.getBoundingClientRect()
      const scale = Math.min(width / w, height / h)
      setFit({ scale, x: Math.round((width - w * scale) / 2), y: Math.round((height - h * scale) / 2) })
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(el)
    return () => ro.disconnect()
  }, [w, h])
  return (
    <div className="stage-viewport" ref={ref} onClick={onClick}>
      <div className="stage" style={{ width: w, height: h, left: fit.x, top: fit.y, transform: `scale(${fit.scale})` }}>
        {children}
      </div>
    </div>
  )
}
