import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* The close of the service chapter: reconfirm what Service Architecture is
   for. It turns operations into business context — so people operate better,
   and agents get the best context to operate in. The kicker names the
   architecture, the headline states what it does, the two values arrive as a
   pair (human amber, agent cyan), then the closing line with "làm việc cùng nhau"
   in the hand font. On its own, no click. */
export function BuildTogetherSlide() {
  return (
    <SlideFrame chapter="operation" layout="center">
      <div className="concl">
        <Reveal at={0} delay={0.4}>
          <p className="ctx-kicker">Base Agentic OS</p>
        </Reveal>
        <Reveal at={0} delay={0.9}>
          <div className="h1"><span className="tone-blue">Kiến trúc vận hành doanh nghiệp</span> (Service Architecture)<br />cho Con người và Agent.</div>
        </Reveal>
        <Reveal at={0} delay={2.2}>
          <div className="concl-pair">
            <div>
              <b className="tone-human">Con người</b>
              <p>vận hành tốt hơn hẳn — service, rules, tasks nằm trong cùng một ngữ cảnh.</p>
            </div>
            <div>
              <b className="tone-agent">Agent</b>
              <p>có business context tốt nhất để vận hành — cùng service, cùng rules, cùng tools.</p>
            </div>
          </div>
        </Reveal>
        <Reveal at={0} delay={3.8}>
          <p className="concl-close">
            Đó là cách chúng ta xây dựng business context cho con người và agents
            <span className="quoteline vi">làm việc cùng nhau!</span>
          </p>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
