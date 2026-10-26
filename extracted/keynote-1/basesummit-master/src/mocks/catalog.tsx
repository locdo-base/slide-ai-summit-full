import type { ComponentType } from 'react'
import { Frame, Window, type WindowProps } from './Window'
import { TasksHomeMock } from './TasksHomeMock'
import { NestedCardMock, PlanPaneMock } from './NestedPlanMock'
import { AssessmentMock } from './AssessmentMock'
import { RuleDetailMock } from './RuleDetailMock'
import { OutputsMock } from './OutputsMock'
import { NewAssistantMock, DutyMock } from './BoundaryMocks'
import { ModelsMock } from './ModelsMock'
import { UsageMock } from './UsageMock'
import { CapacitiesMock } from './CapacitiesMock'
import { AssistantMock } from './AssistantMock'
import { AskPanelMock, ApprovalCardMock } from './CopilotMocks'
import { AgentPeekMock, JobLedgerMock } from './AgentStageMocks'
import { AmberMock } from './AmberMock'
import { CrewMock } from './CrewMock'
import { HrmMock } from './HrmMock'
import { SalesforceMock } from './SalesforceMock'
import { StudioBuilderStill } from './StudioDemo'
import { RulesListMock } from './RulesListMock'
import { RulesWalkMock } from './RulesWalkMock'
import { AskRulesMock } from './AskRulesMock'
import { CopilotWalkMock } from './CopilotWalkMock'
import { TasksWalkMock } from './TasksWalkMock'
import { OutputsWalkMock } from './OutputsWalkMock'
import { SalesPipelineMock, LeadDetailMock, RequestsMock, HrisMock, HiringMock, ServiceRegistryMock } from './PlatformMocks'
import { MessageMock } from './MessageMock'
import { RequestListMock } from './RequestListMock'
import { AgentTasksMock } from './AgentTasksMock'
import { AgentTasksWalkMock, AssistantChatMock } from './AgentTasksWalkMock'
import { PipelineSettingsMock } from './PipelineSettingsMock'
import { FieldsWalkMock } from './FieldsWalkMock'
import { OpsWalkMock } from './OpsWalkMock'
import { ExternalWalkMock } from './ExternalWalkMock'
import { UiWalkMock } from './UiWalkMock'
import { ExchangeWalkMock } from './ExchangeWalkMock'
import { OperatorsWalkMock } from './OperatorsWalkMock'
import { ContextWalkMock } from './ContextWalkMock'
import { HomeAppMock } from './HomeAppMock'

/* The catalog: every product mock the decks show, in one place.

   A slide places a mock with `<MockWindow id="…" x y />` and the gallery
   (`#/mocks`) lists every entry here, so adding a mock is: draw it in its own
   file, add one entry below, place it. The frame — browser chrome, zoom, width
   — is decided here once, so the slide and the gallery always agree. */

export interface MockDef {
  id: string
  name: string
  /** One line on what the window proves. */
  note: string
  /** The keynote and the slide (by its id) that shows it. */
  keynote: string
  slide: string
  /** How it is framed: `url` adds browser chrome (and the 1540 default width),
   *  `zoom` is the CSS zoom the app is drawn at, `width` the window's width. */
  frame: { url?: string; zoom: number; width?: number }
  component: ComponentType
}

export const MOCKS: MockDef[] = [
  // ── Intelligence Architecture ──────────────────────────────────────────
  {
    id: 'pipeline-settings', name: 'Sales Pipeline — settings', keynote: 'intelligence', slide: 'unified-settings',
    note: 'One app\'s settings dialog, walking its pages on a timer — stages, accesses, permissions, custom views, layouts. Each is a service setting, so the same page shape holds for every app.',
    frame: { url: '/app/sales/pipeline/settings/stages', zoom: 1.08 }, component: PipelineSettingsMock,
  },
  {
    id: 'outputs-walk', name: 'Outputs — the output models', keynote: 'intelligence', slide: 'output-driven',
    note: 'Four Workforce screens walking on a timer: the output registry, the managed records behind one output, the workload every record costs, and the reviews that rate the work.',
    frame: { url: '/app/workforce/outputs', zoom: 0.95 }, component: OutputsWalkMock,
  },
  {
    id: 'tasks-walk', name: 'Tasks — the unified task model', keynote: 'intelligence', slide: 'unified-tasks',
    note: 'Five Tasks screens walking on a timer: the home (one place), a service\'s works list (service-driven), one request five levels deep (infinitely nested), work assigned to an org unit, and the work plan it streams into.',
    frame: { url: '/app/task/home', zoom: 0.95 }, component: TasksWalkMock,
  },
  {
    id: 'fields-walk', name: 'Data fields — registry and per service', keynote: 'intelligence', slide: 'unified-data-fields',
    note: 'Walked on a timer: the company-wide field registry in Workforce, then the same fields configured inside one service — the Sales Pipeline settings.',
    frame: { url: '/app/workforce/fields', zoom: 1.08 }, component: FieldsWalkMock,
  },
  {
    id: 'ui-walk', name: 'Unified UI — Requests, Tasks, Workflows', keynote: 'intelligence', slide: 'unified-ui',
    note: 'Walked one per click: the Requests home, the Tasks home and a Workflows jobs board — the same top bar, sidebar of services and page in every app.',
    frame: { url: '/app/request/home', zoom: 0.85 }, component: UiWalkMock,
  },
  {
    id: 'ops-walk', name: 'Service operations — simple, complex, orchestrated', keynote: 'intelligence', slide: 'autonomous',
    note: 'Walked on a timer: the Requests list (a simple service operation), the Sales Pipeline board (a complex one), and a deal opened — custom fields, collaborations, smart ops, agent flows (complex work orchestration inside).',
    frame: { url: '/app/requests', zoom: 0.85 }, component: OpsWalkMock,
  },
  {
    id: 'external-walk', name: 'External connections — webforms, service gateways', keynote: 'intelligence', slide: 'external',
    note: 'SAMPLE, captures to come. Walked one per click: the webforms that create records in a service from outside, then the service gateways that let outside systems call it.',
    frame: { url: '/app/workforce/webforms', zoom: 0.85 }, component: ExternalWalkMock,
  },
  {
    id: 'exchange-walk', name: 'Service exchange — exchanges and field mapping', keynote: 'intelligence', slide: 'service-exchange',
    note: 'Walked on a timer: a service\'s Exchanges page — its events wired to other services — then one exchange opened on its field mapping, source field to destination field.',
    frame: { url: '/app/workforce/services/request.approval/exchanges', zoom: 0.82 }, component: ExchangeWalkMock,
  },
  {
    id: 'operators-walk', name: 'Operator model — by orgchart, by position, to an agent', keynote: 'intelligence', slide: 'unified-operators',
    note: 'Walked on a timer: an approval block assigned by org unit, the same by position (a seat, with or without a holder), and a work flow where one step is an agent of its own.',
    frame: { url: '/app/request/services/purchasing/settings/approval', zoom: 0.82 }, component: OperatorsWalkMock,
  },
  {
    id: 'tasks-home', name: 'Tasks home', keynote: 'intelligence', slide: 'unified-tasks',
    note: 'Every service in one list — facilities, IT, product, directives — with children inline under their parent.',
    frame: { url: '/app/task/home', zoom: 1.15 }, component: TasksHomeMock,
  },
  {
    id: 'request-card', name: 'Request card', keynote: 'intelligence', slide: 'unified-approvals',
    note: 'One request at real density; sub-requests nest as deep as the work does.',
    frame: { zoom: 1.15, width: 640 }, component: NestedCardMock,
  },
  {
    id: 'plan-pane', name: 'Plan pane', keynote: 'intelligence', slide: 'unified-tasks',
    note: 'A plan item links to the real requests; progress rolls up from the work, not from a typed status.',
    frame: { zoom: 1.15, width: 760 }, component: PlanPaneMock,
  },
  {
    id: 'assessment', name: 'Review record', keynote: 'agent', slide: 'assessment',
    note: 'A review the agent wrote by following a rule: the criteria and bands the rule declares, the score per criterion with the reason, the steps it ran.',
    frame: { url: '/app/tasks/executive/EXD-020/reviews', zoom: 0.76, width: 1340 }, component: AssessmentMock,
  },
  {
    id: 'rule-page', name: 'Rule page', keynote: 'agent', slide: 'rules-walk',
    note: 'The travel and expense policy as people read it, and the briefing the platform wrote for agents.',
    frame: { url: '/app/workrule/rules/POL-014', zoom: 1.1 }, component: RuleDetailMock,
  },
  {
    id: 'outputs', name: 'Outputs register', keynote: 'intelligence', slide: 'platform',
    note: 'Deliverables counted from every app; each row carries where it came from and what it counts toward.',
    frame: { url: '/app/output/outputs', zoom: 1.1 }, component: OutputsMock,
  },

  // ── Agent Architecture ─────────────────────────────────────────────────
  {
    id: 'new-assistant', name: 'New assistant', keynote: 'agent', slide: 'kinds',
    note: 'An assistant is yours alone — scoped to what you can already see.',
    frame: { zoom: 1.18, width: 460 }, component: NewAssistantMock,
  },
  {
    id: 'duty', name: 'Agent duty', keynote: 'agent', slide: 'rules-walk',
    note: "A shared agent's duty binds it to one service, with rules.",
    frame: { zoom: 1.18, width: 700 }, component: DutyMock,
  },
  {
    id: 'models', name: 'Model settings', keynote: 'agent', slide: 'models',
    note: 'Claude, GPT, Gemini and any OpenAI-compatible endpoint — metered per person, per model, per day.',
    frame: { url: '/app/aiplatform/settings/models', zoom: 1.08 }, component: ModelsMock,
  },
  {
    id: 'usage', name: 'Usage report', keynote: 'agent', slide: 'models',
    note: 'Settings › Usage: LLM spend, requests and tokens across providers for the last 30 days — the trend, and the split by provider and by token.',
    frame: { url: '/app/aiplatform/settings/usage', zoom: 1.08 }, component: UsageMock,
  },
  {
    id: 'capacities', name: 'Skills and connections', keynote: 'agent', slide: 'tools-skills',
    note: 'Each skill carries its instructions; each connection names a system it can reach — never a credential.',
    frame: { zoom: 1.12, width: 1180 }, component: CapacitiesMock,
  },
  {
    id: 'assistant', name: 'Assistant chat', keynote: 'agent', slide: 'kinds',
    note: 'Tasks, services, deals — everything in your scope, and nothing beyond it.',
    frame: { url: '/app/aiplatform/assistant/grace/chats', zoom: 1.08 }, component: AssistantMock,
  },
  {
    id: 'ask-panel', name: 'Deal copilot', keynote: 'agent', slide: 'service',
    note: 'Prices with the pricing engine and proposes — the model never produces a number.',
    frame: { zoom: 1.1, width: 620 }, component: AskPanelMock,
  },
  {
    id: 'approval-card', name: 'Approval copilot', keynote: 'agent', slide: 'task-models',
    note: 'Recommends; a person decides.',
    frame: { zoom: 1.1, width: 700 }, component: ApprovalCardMock,
  },
  {
    id: 'agent-peek', name: 'Agent stage', keynote: 'agent', slide: 'request-graph',
    note: 'One instruction, one model, one output shape, one outcome — snapshotted onto every run.',
    frame: { zoom: 1.1, width: 520 }, component: AgentPeekMock,
  },
  {
    id: 'job-ledger', name: 'Run ledger', keynote: 'agent', slide: 'request-graph',
    note: "Agent tasks sit in the same ledger as people's.",
    frame: { zoom: 1.1, width: 820 }, component: JobLedgerMock,
  },
  {
    id: 'amber', name: 'Amber desktop', keynote: 'agent', slide: 'kinds',
    note: 'The agent on your desk: sees your apps and tabs, drives a browser, runs code — keys and memory stay on the machine.',
    frame: { zoom: 1.08, width: 1360 }, component: AmberMock,
  },
  {
    id: 'crew', name: 'Agent crew', keynote: 'agent', slide: 'compare',
    note: 'Roles, reporting lines and a monthly budget per agent — the way you would run a team.',
    frame: { zoom: 1.1, width: 1240 }, component: CrewMock,
  },

  {
    id: 'copilot-walk', name: 'Service copilot — the walk', keynote: 'agent', slide: 'copilot',
    note: "The Request app's copilot, two screens a click apart: embedded beside a purchasing request with the questions it knows to ask, then answering from the object's fields, the purchasing policy, the approval flow and the history.",
    frame: { url: '/app/requests/finance/purchasing/PO-2026-00006', zoom: 0.75, width: 1340 }, component: CopilotWalkMock,
  },
  {
    id: 'context-walk', name: 'Context discovery — the walk', keynote: 'agent', slide: 'context-discovery',
    note: 'The Sales Pipeline’s deal page with its copilot, five clicks: one deal id, the object, the service, its rules and tools, then the agent acting on the deal — the copilot’s trace growing a line per step.',
    frame: { url: '/app/sales/deal/149918', zoom: 0.75, width: 1520 }, component: ContextWalkMock,
  },
  {
    id: 'home-app', name: 'Home app — people and agents on every service', keynote: 'agent', slide: 'home-app',
    note: 'The Home app: the Service Assistant works one question through the services it has access to — a trace, the answer, a drafted quote prefilled and unsent — while the service hubs light the services it touched. Plays on its own.',
    frame: { url: '/app/home', zoom: 0.9, width: 1968 }, component: HomeAppMock,
  },
  {
    id: 'rules-walk', name: 'Work rules — the walk', keynote: 'agent', slide: 'rules-walk',
    note: 'Five Work rules screens a click apart: the rules register (every rule a system-level entity), a rule page with the services and agents it is linked to, a workflow’s Settings › AI rules & agents (the rules and agents bound to that service), the inbox of rollouts (the announcement), and the assignments — readings, attestations, knowledge checks (the attestation).',
    frame: { url: '/app/workrule/rules', zoom: 0.95 }, component: RulesWalkMock,
  },
  {
    id: 'ask-rules', name: 'Ask AI about the rules', keynote: 'agent', slide: 'ask-rules',
    note: 'Personal rules › Ask AI: a short conversation playing on its own — people ask about leave, probation and working from home; the copilot answers from the rules they can see and names the rules it used.',
    frame: { url: '/app/workrule/company-policies/ask', zoom: 0.95 }, component: AskRulesMock,
  },
  {
    id: 'rules-list', name: 'Rules register', keynote: 'agent', slide: 'rules-walk',
    note: 'Every rule in the company in one register — its kind, the service or agent it is linked to, its scope and its regulations.',
    frame: { url: '/app/workrule/rules', zoom: 1.1 }, component: RulesListMock,
  },
  {
    id: 'agent-tasks', name: 'Agent tasks', keynote: 'agent', slide: 'tasks',
    note: "The agent's own task list — what it has to do, and where each task came from: a schedule, a person, a trigger, the assistant.",
    frame: { url: '/app/aiplatform/agents/grace/tasks', zoom: 1.1, width: 1040 }, component: AgentTasksMock,
  },
  {
    id: 'agent-tasks-walk', name: 'Agent tasks — where they come from', keynote: 'agent', slide: 'tasks',
    note: 'Three screens a click apart: the agent’s own task box, tasks handed to it in chat (the assistant turns a message into tasks on its list), and tasks assigned in service operation — a request’s approval sequence with the agent as one of its steps.',
    frame: { url: '/app/aiplatform/agents/grace/tasks', zoom: 0.95 }, component: AgentTasksWalkMock,
  },
  {
    id: 'assistant-chat', name: 'Assistant — personal chat', keynote: 'agent', slide: 'assistant',
    note: 'A personal assistant in chat: Grace reaches the owner’s calendar, mail and tasks, keeps long-term memory of them, and turns one message into tasks on her list.',
    frame: { url: '/app/aiplatform/agents/grace/chats', zoom: 0.95 }, component: AssistantChatMock,
  },

  // The platform tour — one screen per category, all invented data.
  {
    id: 'sales-pipeline', name: 'Sales pipeline', keynote: 'intelligence', slide: 'platform',
    note: 'The deal board: stages with their totals, deals with owner, tags and value.',
    frame: { url: '/app/sales/pipeline', zoom: 0.84 }, component: SalesPipelineMock,
  },
  {
    id: 'lead-detail', name: 'Lead record', keynote: 'intelligence', slide: 'platform',
    note: 'One lead: ownership, stage, feed and todos, source and attribution, enrichment.',
    frame: { url: '/app/lead/crm/leads/394', zoom: 0.84 }, component: LeadDetailMock,
  },
  {
    id: 'message', name: 'Message — company group chat', keynote: 'intelligence', slide: 'platform',
    note: 'A company-wide group chat: the conversation list, a pinned announcement, an event poster, a poll with its chart, and the CRM bot cheering a closed deal. Invented Vietnamese names.',
    frame: { url: '/app/message/company', zoom: 0.84 }, component: MessageMock,
  },
  {
    id: 'request-list', name: 'Base Request — list of requests', keynote: 'intelligence', slide: 'platform',
    note: 'The classic Base Request list: title with its group and first line, status, who asked, approvers with their verdicts, date and unread dot. Invented Vietnamese names.',
    frame: { url: '/app/request/all', zoom: 0.84 }, component: RequestListMock,
  },
  {
    id: 'requests', name: 'Requests', keynote: 'intelligence', slide: 'platform',
    note: 'The Requests home at real density: service and department, status, who asked, who is on turn with their verdict, the date, bookmark and unread dot; Human Resources opened in the sidebar.',
    frame: { url: '/app/request/home', zoom: 0.84 }, component: RequestsMock,
  },
  {
    id: 'hris', name: 'Employee register', keynote: 'intelligence', slide: 'platform',
    note: 'The HR information system: every employee with job profile, department, office, type, status.',
    frame: { url: '/app/hris/employees', zoom: 0.84 }, component: HrisMock,
  },
  {
    id: 'hiring', name: 'Hiring pipeline', keynote: 'intelligence', slide: 'platform',
    note: "A job's candidates by stage, each stage with its SLA; overdue cards flagged.",
    frame: { url: '/app/hiring/jobs/55861', zoom: 0.84 }, component: HiringMock,
  },

  {
    id: 'service-registry', name: 'Service registry', keynote: 'intelligence', slide: 'holistic-view',
    note: 'Every service in the company in one register — its app, its model, its scope, what it is for — walked on a timer through three views: the holistic list, by department, by user.',
    frame: { url: '/app/workforce/services', zoom: 0.95 }, component: ServiceRegistryMock,
  },

  // ── Service Architecture ───────────────────────────────────────────────
  // Two products that are not ours, so no `url`: a compact frame prints no host.
  {
    id: 'hrm-employees', name: 'Base HRM — employees', keynote: 'intelligence', slide: 'current-software',
    note: 'The register of employee records at real density — the current software as a store of data.',
    frame: { zoom: 1.14, width: 680 }, component: HrmMock,
  },
  {
    id: 'sf-opportunities', name: 'Salesforce — opportunities', keynote: 'intelligence', slide: 'current-software',
    note: 'A Lightning opportunities board — stages, pipeline totals, the donut: a store of data with actions on top.',
    frame: { zoom: 1.14, width: 680 }, component: SalesforceMock,
  },

  // ── Launching Timeline ─────────────────────────────────────────────────
  // A desktop app, so no `url`: the window carries its own title bar. On the
  // slide it is a scene that plays; here it is the CRM build on its last frame.
  {
    id: 'studio-builder', name: 'AI Studio — builder', keynote: 'launch', slide: 'one-more-thing',
    note: 'One prompt in, an app out: the CRM report built from Base Sales, connected without configuration.',
    frame: { zoom: 1, width: 1440 }, component: StudioBuilderStill,
  },
]

export function mock(id: string): MockDef {
  const m = MOCKS.find(x => x.id === id)
  if (!m) throw new Error(`No mock "${id}" in the catalog (src/mocks/catalog.tsx)`)
  return m
}

/** A catalog mock in its window, on a slide. The slide says where it goes and
 *  at which build it enters; the frame is the catalog's. */
export function MockWindow({ id, ...place }: { id: string } & Pick<WindowProps, 'x' | 'y' | 'at' | 'style'>) {
  const m = mock(id)
  return <Window {...m.frame} {...place}><m.component /></Window>
}

/** The same window in normal flow — the gallery's thumbnails and 1:1 view. */
export function MockFrame({ id }: { id: string }) {
  const m = mock(id)
  return <Frame {...m.frame}><m.component /></Frame>
}
