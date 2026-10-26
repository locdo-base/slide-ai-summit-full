import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useStep } from '../../../engine/step'

/* The close. Base Agentic OS, centred, over its nine concepts — names only,
   nothing to read, a 3×3 grid of the glass boxes arriving on their own. One
   click: title and grid fold into a left column, and the right column opens
   down the whole height under the breadcrumb, past a hairline, for the
   three-years line and the words the talk ends on. The stage is one grid
   whose columns animate (px to px, so the tracks interpolate), so the boxes
   reflow rather than jump; the slide draws its own title so it belongs to
   the left column. */
const CONCEPTS = [
  'Service', 'Service-oriented architecture', 'Context',
  'Rules', 'Tasks', 'AGENTS.md',
  'Reinforcement learning', 'Runtime', 'Memory',
]

export function SummarySlide() {
  const aside = useStep() >= 1
  return (
    <SlideFrame chapter="operation" layout="center" figureClass="learn-fig">
      <div className={`learn-stage${aside ? ' aside' : ''}`}>
        <div className="learn-left">
          <Reveal at={0}>
            <h1 className="h1 learn-title">Base Agentic OS.</h1>
            <p className="learn-sub">Quá nhiều sự thay đổi, quá nhiều khái niệm và kiến thức mới.</p>
          </Reveal>
          <div className="i2-boxes learn-grid">
            {CONCEPTS.map((term, i) => (
              <Reveal key={term} at={0} delay={0.3 + i * 0.16}>
                <div className="i2-box learn-box">
                  <span className="i2-n">0{i + 1}</span>
                  <h3>{term}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="learn-divider" />
        <div className="learn-right">
          <Reveal at={1} delay={0.45}>
            <p className="learn-ai"><b>AI: trong 03 năm</b>từ dự đoán the next token đến AGI.</p>
          </Reveal>
          <Reveal at={1} delay={0.9}>
            <div className="learn-rule" />
            <p className="learn-word">The Age of<br />Learning</p>
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  )
}
