import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'

/* AI is many AIs. Left, quiet: the landscape as one line of names, then what
   business leaders care about — the impact on people, process and data — as
   three plain rows under hairlines. Right: the question the deck sets out to
   answer — how do we make AI and agents work for us and create value, and
   what has to change. The left builds first; the question lands after. */
const AIS = ['Claude', 'OpenAI', 'Gemini', 'Llama', 'Mistral', 'DeepSeek', 'Grok', 'Copilot', 'Qwen']

const ASKS = ['Phần mềm?', 'Quy trình?', 'Hay chính chúng ta?']

const IMPACT = [
  { word: 'Con người', sub: 'Con người sẽ làm gì, khi AI làm được nhiều hơn?' },
  { word: 'Quy trình', sub: 'AI có thể tham gia quy trình nào, và ai chịu trách nhiệm?' },
  { word: 'Dữ liệu', sub: 'Dữ liệu nào sẽ gửi cho AI, và làm sao để AI hiểu được dữ liệu đó?' },
]

export function ManyAisSlide() {
  return (
    <SlideFrame layout="stack">
      <div className="ais3">
        <div className="ais3-left">
          <Reveal at={0} from="none">
            <h2 className="ais2-title ais3-head">AI: Đa dạng về quy mô và năng lực</h2>
          </Reveal>
          <p className="ais3-names">
            {AIS.map((name, i) => (
              <Reveal key={name} at={0} delay={0.2 + i * 0.06} from="none">
                <span>{name}</span>
              </Reveal>
            ))}
          </p>
          <div className="ais3-impact">
            <Reveal at={0} delay={0.8} from="none">
              <p className="ais3-label">Tác động kinh doanh <span>Từ FOMO, đến hào hứng, rồi bối rối</span></p>
            </Reveal>
            {IMPACT.map((t, i) => (
              <Reveal key={t.word} at={0} delay={0.9 + i * 0.18} from="none">
                <div className="ais3-row">
                  <b>{t.word}</b>
                  <span>{t.sub}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal at={0} delay={1.6} className="ais3-ask">
          <div>
            <h2 className="ais2-title human">Làm sao để AI / Agent làm việc cho chúng ta và tạo ra giá trị?</h2>
            <p className="ask-sub">Điều gì cần phải thay đổi?</p>
            <div className="ask-pills">
              {ASKS.map((a, i) => (
                <Reveal key={a} at={0} delay={2.2 + i * 0.25} from="none"><span className="shots-pill">{a}</span></Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
