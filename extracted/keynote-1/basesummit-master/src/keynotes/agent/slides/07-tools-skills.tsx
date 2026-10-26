import { ScrollText, ListChecks, BookOpen } from 'lucide-react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useStep } from '../../../engine/step'

const WORDS = [
  { n: '01', Icon: ScrollText, title: 'Rules', text: 'What to follow.', focus: true },
  { n: '02', Icon: ListChecks, title: 'Tasks', text: 'What to do.', focus: true },
  { n: '03', Icon: BookOpen, title: 'Knowledge', text: 'What to know.' },
]

/* What an agent can do, in three words. Three glass boxes — an icon, the
   word, one line — arriving one after another on their own. One click: rules
   and tasks light up, knowledge steps back, and the footer pill says today's
   focus. */
export function ToolsSkillsSlide() {
  const step = useStep()
  const focused = step >= 1
  return (
    <SlideFrame
      chapter="rules"
      layout="stack"
      headline="Agent capacities: Tools and skills."
      lead="Three concepts."
    >
      <div className="caps-row">
        <div className="i2-boxes three">
          {WORDS.map((w, i) => (
            <Reveal key={w.title} at={0} delay={0.3 + i * 0.15}>
              <div className={`i2-box${focused ? (w.focus ? ' focus' : ' back') : ''}`}>
                <span className="i2-n">{w.n}</span>
                <w.Icon strokeWidth={1.6} />
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal at={1} className="caps-row-go">
          <div className="shots-pill">We focus on rules and tasks today</div>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
