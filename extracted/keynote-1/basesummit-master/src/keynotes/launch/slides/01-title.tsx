import { FlowField } from '../../../fx/FlowField'
import { Reveal } from '../../../ui/Reveal'
import { Brand } from '../../../ui/Brand'

export function TitleSlide() {  return (
    <div className="title-field">
      <FlowField converge={0.62} />
      <div className="title-veil" />
      <Brand corner />
      <div className="title-words">
        <Reveal at={0}><div className="kicker">AI Summit 2026</div></Reveal>
        <Reveal at={0} delay={0.15}><h1 className="display">Lộ trình ra mắt</h1></Reveal>
        <Reveal at={0} delay={0.45}>
          <div className="trio">
            <span>{'Lộ trình'}</span>
            <span>{'Khách hàng'}</span>
            <span>{'Sản phẩm'}</span>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
