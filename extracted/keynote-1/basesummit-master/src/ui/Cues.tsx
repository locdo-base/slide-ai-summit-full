import type { ReactNode } from 'react'
import { Bot, User } from 'lucide-react'
import { Reveal } from './Reveal'

/* The presenter's memory on the slide itself. The hall may have no notes
   screen, so a slide carries a little more than the clean version: a short
   cue list under the leads (`Cues`), and on the demo slides the one line each
   actor needs from the screen (`Needs`). Both sit in the frame's text column
   through SlideFrame's `aside`, so the figure never has to make room. */

interface CuesProps {
  /** One short line per beat — what to say, not how to say it. */
  items: ReactNode[]
  /** Build step the list arrives at (default: with the slide). */
  at?: number
  /** A step per item from `at` on — the list grows with the talk. */
  stepped?: boolean
  className?: string
}

export function Cues({ items, at = 0, stepped = false, className }: CuesProps) {
  return (
    <ul className={`cues${className ? ' ' + className : ''}`}>
      {items.map((item, i) => (
        <Reveal key={i} at={stepped ? at + i : at} delay={stepped ? 0 : 0.35 + i * 0.08} from="none">
          <li>{item}</li>
        </Reveal>
      ))}
    </ul>
  )
}

interface NeedsProps {
  /** What a person needs from this screen. */
  human: ReactNode
  /** What an agent needs from the same service. */
  agent: ReactNode
  at?: number
}

/** The two actors, one line each — amber for the person, cyan for the agent —
 *  so every demo slide answers the same question: what does each need here? */
export function Needs({ human, agent, at = 0 }: NeedsProps) {
  return (
    <Reveal at={at} delay={0.4} from="none">
      <div className="needs">
        <div className="need need-human"><i><User size={22} /></i><div><b>People need</b><span>{human}</span></div></div>
        <div className="need need-agent"><i><Bot size={22} /></i><div><b>Agents need</b><span>{agent}</span></div></div>
      </div>
    </Reveal>
  )
}
