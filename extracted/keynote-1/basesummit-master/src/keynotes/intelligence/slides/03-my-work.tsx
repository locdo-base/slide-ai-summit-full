import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useCountUp } from '../../../fx/useCountUp'

/* Ten years looking back — Base's story, not the speaker's. The three numbers
   stack down the left and count up when the slide arrives: the years building
   the platform, the business customers, and the countries they are in. The
   one mission those years served sits to the right. What the years taught is
   spoken, not shown. */
const STATS = [
  { n: 10, prefix: '', suffix: '', what: 'năm xây dựng nền tảng Base' },
  { n: 12000, prefix: '+', suffix: '', what: 'doanh nghiệp khách hàng' },
  { n: 10, prefix: '+', suffix: '', what: 'quốc gia: Việt Nam & thế giới' },
]

function Stat({ n, prefix, suffix, what, delay }: typeof STATS[number] & { delay: number }) {
  const v = useCountUp(n, true, { duration: 1.6, delay })
  return (
    <div className="stat">
      <div className="stat-n num">{prefix && <i>{prefix}</i>}{Math.round(v).toLocaleString('vi-VN')}{suffix && <i>{suffix}</i>}</div>
      <div className="stat-unit">{what}</div>
    </div>
  )
}

export function MyWorkSlide() {
  return (
    <SlideFrame layout="stack" figureClass="lookback-fig">
      <div className="lookback">
        <div className="lookback-stats">
          {STATS.map((s, i) => (
            <Reveal key={s.what} at={0} delay={0.2 + i * 0.12}>
              <Stat {...s} delay={0.3 + i * 0.15} />
            </Reveal>
          ))}
        </div>
        <div className="lookback-mission">
          <Reveal at={0} delay={0.15}><div className="lookback-kicker">10 years with one simple mission</div></Reveal>
          <Reveal at={0} delay={0.3}><h1 className="h1">Make software accessible and useful for enterprises</h1></Reveal>
        </div>
        <Reveal at={0} delay={0.5} from="none" className="lookback-vi">
          10 năm với một sứ mệnh đơn giản: Đưa phần mềm hữu ích và dễ dàng tiếp cận hơn với các doanh nghiệp.
        </Reveal>
      </div>
    </SlideFrame>
  )
}
