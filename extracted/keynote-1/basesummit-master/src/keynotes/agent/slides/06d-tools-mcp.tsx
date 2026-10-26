import { Plug } from 'lucide-react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { Cmd } from './tools-shared'

/* Tools, 2 of 3: Base MCP — every service of Base is an MCP server. Add it to
   Claude Code with one command, or paste the URL into any MCP client. The
   card alone, large, beside the words. No click. */
export function ToolsMcpSlide() {
  return (
    <SlideFrame
      chapter="anatomy"
      headline="Base MCP."
      lead={<>Mỗi service của Base là <em className="hl">một MCP server</em>.</>}
      cues={['thêm vào Claude Code bằng một lệnh — hoặc dán URL vào Cursor, ChatGPT, agent tự viết', 'tools của Base thành tools của họ, không cần tích hợp riêng']}
    >
      <Reveal at={0} delay={0.3}>
        <div className="i2-box tools-box tools-solo">
          <span className="i2-n">02</span>
          <div className="tools-title"><Plug strokeWidth={1.6} /><h3>Base MCP</h3></div>
          <Cmd label="Claude Code:"><b>claude</b> mcp add base <u>https://mcp.base.vn</u> <i>--scope user</i></Cmd>
          <Cmd label="Cursor, ChatGPT, any MCP client:"><s>{'{'}</s> <i>"url"</i>: <u>"https://mcp.base.vn/service/sales-pipeline"</u> <s>{'}'}</s></Cmd>
          <Cmd label="Một service — một server:"><u>mcp.base.vn/service/</u><i>request</i> <s>·</s> <u>…/service/</u><i>hiring</i> <s>·</s> <u>…/service/</u><i>hr</i> <s>·</s> <i>…</i></Cmd>
        </div>
      </Reveal>
    </SlideFrame>
  )
}
