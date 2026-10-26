import { Wrench, ScrollText, ListChecks, FileCode2 } from 'lucide-react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* The stop slide before the deep dives: the four parts of the architecture
   the talk goes through next — Tools, Rules, Tasks, AGENTS.md — one glass box
   each, arriving on their own. The presenter speaks to the topics; the boxes
   carry only a name and a phrase. No click. */
const TOPICS = [
  { n: '01', Icon: Wrench, title: 'Tools', text: 'Công cụ cho agents.' },
  { n: '02', Icon: ScrollText, title: 'Rules', text: 'Quy tắc cho người và agents.' },
  { n: '03', Icon: ListChecks, title: 'Tasks', text: 'Công việc giao cho agents.' },
  { n: '04', Icon: FileCode2, title: 'AGENTS.md', text: 'Hướng dẫn của agent.' },
]

export function TopicsSlide() {
  return (
    <SlideFrame
      chapter="anatomy"
      layout="stack"
      headline="Agent architecture."
      lead="04 khái niệm cơ bản."
    >
      <div className="i2-boxes">
        {TOPICS.map((t, i) => (
          <Reveal key={t.title} at={0} delay={0.3 + i * 0.45}>
            <div className="i2-box">
              <span className="i2-n">{t.n}</span>
              <t.Icon strokeWidth={1.6} />
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SlideFrame>
  )
}
