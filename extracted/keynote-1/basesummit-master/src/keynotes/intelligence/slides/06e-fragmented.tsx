import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import fragmented from '../../agent/assets/fragmented.svg?raw'

/* The contrast. Left: the LLM is optimised for the end user — it serves the one person
   in front of it and learns their chat history, habits and tastes. Right:
   the business context it would need is fragmented, isolated, fading — the
   reference deck's SVG as drawn (its SMIL animation inside), the systems
   holding their own data and the AI hopping between them. Left first, then
   the right lands a beat later. */
const USER_FIRST = [
  'Tập trung cho người dùng cuối',
  'Hiểu lịch sử chat, thói quen, sở thích cá nhân',
]

export function FragmentedSlide() {
  return (
    <SlideFrame layout="stack">
      <div className="frag2">
        <div className="frag2-left">
          <Reveal at={0} from="none"><p className="ctx-kicker">LLM Model</p></Reveal>
          <Reveal at={0} delay={0.1}><h2 className="h1 frag2-title">Tối ưu cho<br /><span className="frag2-ai">người dùng cuối</span></h2></Reveal>
          <ul className="frag2-points">
            {USER_FIRST.map((t, i) => (
              <Reveal key={t} at={0} delay={0.4 + i * 0.2} from="none"><li>{t}</li></Reveal>
            ))}
          </ul>
        </div>
        <div className="frag2-right">
          <Reveal at={0} delay={0.9} from="none"><p className="ctx-kicker">Business context</p></Reveal>
          <Reveal at={0} delay={1.0}><h2 className="h1 frag2-title"><span className="tone-human">Phân mảnh · Cô lập · Loãng dần</span></h2></Reveal>
          <Reveal at={0} delay={1.3} from="none">
            <div className="frag2-fig" dangerouslySetInnerHTML={{ __html: fragmented }} />
          </Reveal>
        </div>
      </div>
    </SlideFrame>
  )
}
