import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useBrand } from '../../../ui/Brand'

/* The announcement: after ten years, a new product architecture and platform
 * — the Agentic OS. A statement slide between the cover and the timeline: an
 * eyebrow, the brand line, and the name big across the stage, its colour
 * drifting through the deck's blues and the agent's cyan. */
export function LaunchAgenticOsSlide() {
  const { wordmark } = useBrand()
  return (
    <SlideFrame chapter="platform" layout="center">
      <div className="os-statement">
        <Reveal at={0}>
          <div className="os-eyebrow">
            Nền tảng phần mềm
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 3.5 4.5 4.5L6 12.5" />
            </svg>
          </div>
        </Reveal>
        <Reveal at={0} delay={0.15}>
          <div className="os-of">The new {wordmark}:</div>
        </Reveal>
        <Reveal at={0} delay={0.4}>
          <h1 className="os-name">The Agentic Operating System</h1>
        </Reveal>
      </div>
      <Reveal at={0} delay={0.8} className="os-runs">Running on AI operation services</Reveal>
    </SlideFrame>
  )
}
