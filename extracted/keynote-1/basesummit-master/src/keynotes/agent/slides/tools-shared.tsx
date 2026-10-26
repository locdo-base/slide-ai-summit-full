import { Copy } from 'lucide-react'

/* Shared by the three Tools slides: the two tool lists, the endless row that
   shows them, and the one-liner drawn like an install page. */

export const SERVICE_TOOLS = [
  'service:get_object', 'service:search_objects', 'service:get_service', 'service:list_services', 'service:get_rules',
  'service:get_tools', 'service:add_comment', 'service:upload_file', 'service:log_activity', 'service:set_owner', 'service:add_watcher',
  'rules:search_rules', 'rules:attest_rule', 'rules:ask', 'rules:link_service',
  'sales:create_deal', 'sales:get_deal', 'sales:update_deal', 'sales:list_deals', 'sales:move_stage', 'sales:forecast',
  'sales:create_lead', 'sales:qualify_lead', 'sales:convert_lead', 'sales:log_call',
  'request:get_request', 'request:create_request', 'request:approve', 'request:reject', 'request:escalate',
  'task:create_task', 'task:assign_task', 'task:complete_task', 'task:list_tasks', 'task:plan_week',
  'workflow:create_job', 'workflow:move_job_stage', 'workflow:run', 'workflow:get_job',
  'hiring:get_candidate', 'hiring:schedule_interview', 'hiring:create_offer', 'hiring:score_candidate',
  'hr:get_employee', 'hr:request_leave', 'hr:get_leave_balance', 'hr:compute_payroll',
  'finance:create_invoice', 'finance:get_order', 'finance:check_budget',
  'inventory:update_stock', 'inventory:reorder', 'chat:send_message', 'calendar:create_meeting', 'report:get_report',
]

export const PUBLIC_TOOLS = [
  'Slack', 'Gmail', 'Google Calendar', 'Google Drive', 'Google Sheets', 'Google Docs', 'Notion', 'Jira', 'GitHub',
  'GitLab', 'Figma', 'Zalo', 'Zalo OA', 'Telegram', 'WhatsApp', 'Messenger', 'Stripe', 'PayPal', 'VNPay', 'MoMo',
  'HubSpot', 'Salesforce', 'Shopify', 'Haravan', 'KiotViet', 'Zoom', 'Google Meet', 'Microsoft Teams',
  'Outlook', 'OneDrive', 'SharePoint', 'Dropbox', 'Trello', 'Asana', 'Linear', 'Zapier', 'Make', 'n8n',
  'Claude', 'GPT', 'Gemini', 'Perplexity', 'Tavily', 'Browserbase', 'Playwright', 'Twilio', 'SendGrid',
  'Mailchimp', 'Meta Ads', 'Google Ads', 'TikTok Ads', 'Google Analytics', 'Mixpanel', 'Amplitude', 'Postgres',
  'MySQL', 'BigQuery', 'Snowflake', 'S3', 'Cloudflare', 'Vercel', 'DocuSign', 'Canva', 'Miro', 'Loom',
]

/** One endless row: the list twice over, so the loop never shows its seam. */
export function Marquee({ items, dir, kind, offset = 0, slow }: { items: string[]; dir: 'left' | 'right'; kind: 'code' | 'app'; offset?: number; slow?: boolean }) {
  const list = [...items.slice(offset), ...items.slice(0, offset)]
  return (
    <div className={`tools-marquee ${dir}${slow ? ' slow' : ''}`}>
      <div className="tools-track">
        {[0, 1].map(k => (
          <div className="tools-run" key={k} aria-hidden={k === 1}>
            {list.map(t => <span key={t} className={`tools-chip ${kind}`}>{t}</span>)}
          </div>
        ))}
      </div>
    </div>
  )
}

/** A labelled one-liner, drawn like an install page: the command, its flags,
 *  the URL and the pipe each in their own colour, a copy glyph at the end. */
export function Cmd({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="tools-cmd">
      <span className="lbl">{label}</span>
      <code><span className="line">{children}</span><Copy size={18} className="cp" /></code>
    </div>
  )
}
