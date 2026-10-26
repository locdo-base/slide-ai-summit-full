import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* 6 of 6, and the turn into the talk: intelligence is for sale, business
   context is not — so we build it. Three lines, each arriving on its own. */
export function BuildContextSlide() {
  return (
    <SlideFrame layout="center">
      <div className="buy">
        <Reveal at={0} delay={0.2}>
          <p className="buy-lead">Anyone can buy tokens.<br />Anyone can use the latest models.</p>
        </Reveal>
        <Reveal at={0} delay={0.9}>
          <div className="buy-but"><span className="quoteline">But…</span></div>
          <div className="h1 buy-line">We cannot buy <span className="tone-blue">our business context</span></div>
        </Reveal>
        <Reveal at={0} delay={1.6}>
          <div className="buy-build"><span>We have to build it.</span><span className="quoteline">No shortcut!</span></div>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
