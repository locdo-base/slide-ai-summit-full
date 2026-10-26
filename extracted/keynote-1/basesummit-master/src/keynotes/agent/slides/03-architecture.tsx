import { motion, useReducedMotion } from 'motion/react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useStep } from '../../../engine/step'

/* "What is an agent?" — the title — with two definitions under it. Jensen
   Huang's stands alone, centred in the room below the title, the four parts
   lit. One click: ours arrives beneath it in the same voice, identity at the
   front in the one warm colour, and the pair moves left to make room for
   the drawing on the right — the parts as boxes on the runtime, and the one
   relation that matters: the harness needs the context, and the context is
   where the tools and skills live. */
const ease = [0.2, 0.8, 0.2, 1] as const

/** The parts drawn: identity and the model above, the harness beside the
 *  context it needs — tools and skills inside — and the runtime under all. */
function AgentGraph({ on }: { on: boolean }) {
  const reduce = useReducedMotion()
  const d = (delay: number, duration = 0.5) => ({ delay: reduce || !on ? 0 : delay, duration: reduce ? 0 : duration, ease })
  const box = (delay: number) => ({ initial: false as const, animate: { opacity: on ? 1 : 0, y: on ? 0 : 10 }, transition: d(delay) })
  const label = { fontFamily: 'var(--font-display)', fontWeight: 500 }
  return (
    <svg className="agent-graph" viewBox="0 0 640 440" width={640} height={440}>
      {/* the runtime, under everything */}
      <motion.g {...box(0.2)}>
        <rect x={10} y={372} width={620} height={58} rx={14} fill="color-mix(in srgb, var(--blue-500) 14%, transparent)" stroke="var(--blue-400)" strokeOpacity={0.6} />
        <text x={320} y={408} textAnchor="middle" fontSize={24} fill="var(--blue-100)" style={label}>Runtime</text>
      </motion.g>

      {/* identity, the one warm part */}
      <motion.g {...box(0.4)}>
        <rect x={20} y={14} width={200} height={62} rx={14} fill="color-mix(in srgb, var(--amber-300) 10%, transparent)" stroke="var(--amber-300)" strokeWidth={1.5} />
        <text x={120} y={52} textAnchor="middle" fontSize={24} fill="var(--amber-300)" style={label}>Identity</text>
      </motion.g>
      {/* the model */}
      <motion.g {...box(0.6)}>
        <rect x={20} y={104} width={200} height={62} rx={14} fill="var(--navy-800)" stroke="var(--cyan-300)" strokeWidth={1.5} />
        <text x={120} y={142} textAnchor="middle" fontSize={24} fill="var(--white)" style={label}>LLM model</text>
      </motion.g>
      {/* the harness */}
      <motion.g {...box(0.8)}>
        <rect x={20} y={224} width={200} height={62} rx={14} fill="var(--navy-800)" stroke="var(--cyan-300)" strokeWidth={1.5} />
        <text x={120} y={262} textAnchor="middle" fontSize={24} fill="var(--white)" style={label}>Harness</text>
      </motion.g>
      {/* identity → model → harness: who it is, what it thinks with, what runs it */}
      <motion.path d="M 120 76 V 104" stroke="var(--line-strong)" strokeWidth={2} initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={d(0.7, 0.3)} />
      <motion.path d="M 120 166 V 224" stroke="var(--line-strong)" strokeWidth={2} initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={d(0.9, 0.3)} />

      {/* the harness needs the context */}
      <motion.path d="M 220 255 H 330" stroke="var(--cyan-300)" strokeWidth={3} strokeLinecap="round" initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0 }} transition={d(1.1, 0.5)} />
      <motion.path d="M 318 243 L 332 255 L 318 267" fill="none" stroke="var(--cyan-300)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" initial={false} animate={{ opacity: on ? 1 : 0 }} transition={d(1.5, 0.2)} />
      <motion.text x={275} y={238} textAnchor="middle" fontSize={19} fill="var(--cyan-300)" style={label} initial={false} animate={{ opacity: on ? 1 : 0 }} transition={d(1.4, 0.3)}>needs</motion.text>

      {/* the context, with the tools and skills inside it */}
      <motion.g {...box(1.5)}>
        <rect x={340} y={150} width={286} height={210} rx={18} fill="color-mix(in srgb, var(--cyan-300) 6%, transparent)" stroke="var(--cyan-300)" strokeWidth={1.5} strokeDasharray="8 8" />
        <text x={483} y={190} textAnchor="middle" fontSize={26} fill="var(--cyan-300)" style={label}>Context</text>
      </motion.g>
      {/* AGENTS.md first — the instructions — then the tools and skills */}
      <motion.g {...box(1.8)}>
        <rect x={362} y={206} width={242} height={48} rx={12} fill="var(--navy-800)" stroke="var(--line-strong)" />
        <text x={483} y={237} textAnchor="middle" fontSize={22} fill="var(--white)" style={label}>AGENTS.md</text>
      </motion.g>
      <motion.g {...box(1.95)}>
        <rect x={362} y={264} width={116} height={48} rx={12} fill="var(--navy-800)" stroke="var(--line-strong)" />
        <text x={420} y={295} textAnchor="middle" fontSize={22} fill="var(--white)" style={label}>Tools</text>
      </motion.g>
      <motion.g {...box(2.1)}>
        <rect x={488} y={264} width={116} height={48} rx={12} fill="var(--navy-800)" stroke="var(--line-strong)" />
        <text x={546} y={295} textAnchor="middle" fontSize={22} fill="var(--white)" style={label}>Skills</text>
      </motion.g>
      <motion.text x={483} y={343} textAnchor="middle" fontSize={17} fill="var(--muted)" initial={false} animate={{ opacity: on ? 1 : 0 }} transition={d(2.3, 0.4)}>+ business context, rules, data</motion.text>
    </svg>
  )
}

export function ArchitectureSlide() {
  const on = useStep() >= 1
  return (
    <SlideFrame chapter="anatomy" layout="stack" headline="Agent là gì?">
      <div className={`defs${on ? ' on' : ''}`}>
        <div className="defs-quotes">
          <motion.div layout transition={{ duration: 0.7, ease }}>
            <Reveal at={0} delay={0.3}>
              <p className="def-q">“An agent is the <em className="lit">model</em>, the <em className="lit">harness</em>, <em className="lit">tools and skills</em>, and the <em className="lit">runtime</em>.”</p>
              <p className="def-by">— Jensen Huang, NVIDIA</p>
            </Reveal>
          </motion.div>
          <Reveal at={1} keep={false}>
            <p className="def-q">“An agent is the <em className="lit own">identity</em>, the <em className="lit">LLM model</em>, the <em className="lit">harness</em>, <em className="lit">tools and skills</em>, and the <em className="lit">runtime</em>.”</p>
            <p className="def-by">— Base.vn, for business operation</p>
          </Reveal>
        </div>
        <Reveal at={1} delay={0.2} from="none" keep={false} className="defs-graph">
          <AgentGraph on={on} />
        </Reveal>
      </div>
    </SlideFrame>
  )
}
