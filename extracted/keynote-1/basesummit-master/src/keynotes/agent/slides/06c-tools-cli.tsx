import { Terminal } from 'lucide-react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { Cmd } from './tools-shared'

/* Tools, 1 of 3: Base CLI — the first door through which any agent reaches
   Base. The install card alone, large, beside the words. No click. */
export function ToolsCliSlide() {
  return (
    <SlideFrame
      chapter="anatomy"
      headline="Base CLI."
      lead={<>Một dòng cài đặt. Mọi thao tác trong Base <em className="hl">từ dòng lệnh</em>.</>}
      cues={['developer dùng — và agent chạy trên máy của bạn cũng dùng y hệt', 'desktop agent · Claude Code · Codex']}
    >
      <Reveal at={0} delay={0.3}>
        <div className="i2-box tools-box tools-solo">
          <span className="i2-n">01</span>
          <div className="tools-title"><Terminal strokeWidth={1.6} /><h3>Base CLI</h3></div>
          <Cmd label="macOS, Linux, WSL:"><b>curl</b> <i>-fsSL</i> <u>https://base.vn/install.sh</u> <s>|</s> <b>bash</b></Cmd>
          <Cmd label="Windows PowerShell:"><b>irm</b> <u>https://base.vn/install.ps1</u> <s>|</s> <b>iex</b></Cmd>
          <Cmd label="Rồi, từ bất kỳ đâu:"><b>base</b> sales deals <i>--stage</i> proposal <i>--mine</i></Cmd>
        </div>
      </Reveal>
    </SlideFrame>
  )
}
