import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { Marquee, SERVICE_TOOLS, PUBLIC_TOOLS } from './tools-shared'

/* Tools, 3 of 3: the tools themselves, across the whole stage — service
   tools (the API every service exposes, namespaced) and public tools (the
   world outside) — as marquee rows drifting left and right, a massive list
   that never ends. No click. */
export function ToolsListSlide() {
  return (
    <SlideFrame
      chapter="anatomy"
      layout="stack"
      headline="Tools."
      lead={<>Agent nào bước vào service là <em className="hl">có ngay</em> — và thế giới bên ngoài, nối một lần, mọi agent dùng chung.</>}
    >
      <div className="tools-full">
        <Reveal at={0} delay={0.3} className="tools-group">
          <div className="tools-label"><span className="i2-n">03</span><b>Service tools</b><span>API của từng service, theo namespace</span></div>
          <Marquee items={SERVICE_TOOLS} dir="left" kind="code" />
          <Marquee items={SERVICE_TOOLS} dir="right" kind="code" offset={14} />
          <Marquee items={SERVICE_TOOLS} dir="left" kind="code" offset={28} slow />
          <Marquee items={SERVICE_TOOLS} dir="right" kind="code" offset={42} slow />
        </Reveal>
        <Reveal at={0} delay={0.7} className="tools-group">
          <div className="tools-label"><b>Public tools</b><span>thế giới bên ngoài — nối một lần, mọi agent dùng chung</span></div>
          <Marquee items={PUBLIC_TOOLS} dir="left" kind="app" />
          <Marquee items={PUBLIC_TOOLS} dir="right" kind="app" offset={22} />
          <Marquee items={PUBLIC_TOOLS} dir="left" kind="app" offset={44} slow />
        </Reveal>
      </div>
    </SlideFrame>
  )
}
