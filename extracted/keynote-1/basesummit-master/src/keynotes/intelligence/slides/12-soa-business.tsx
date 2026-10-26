import { Bot, User, Building2 } from 'lucide-react'
import { SlideFrame } from '../../../ui/SlideFrame'
import { Reveal } from '../../../ui/Reveal'
import { useStep } from '../../../engine/step'

/* SOA for business operations: the same principle, read onto the company.
   The three rows arrive together on a stagger. The one click does not
   change the slide: it adds the agents. Cyan marks join the amber people in the Who row, the
   row's words widen to include them, and the banner names the point — our
   agents need the exact same protocol to work together. */
const PERSONS = ['Minh Anh', 'Quốc Bảo', 'Thu Hà']
const PEOPLE = [...PERSONS, 'Kinh doanh', 'Tài chính', 'Vận hành']
const AGENTS = ['Grace', 'Agent báo giá', 'Agent công nợ']

export function SoaBusinessSlide() {
  const step = useStep()
  const agents = step >= 1
  return (
    <SlideFrame
      layout="stack"
      headline="Từ vận hành monolith đến vận hành thông minh ở quy mô lớn."
      lead={<><strong>Mọi thứ là một service</strong>: Cùng một nguyên tắc, cho vận hành doanh nghiệp.</>}
      lead2={<>Điều tuyệt vời nhất: <strong className="tone-agent">AI agent</strong> của chúng ta cần đúng giao thức đó.</>}
      lead2At={1}
    >
      <div className={`ops${agents ? ' with-agents' : ''}`}>
        <Reveal at={0} delay={0.3} className="ops-row">
          <div className="ops-key"><span className="stop-n">01</span><b>The Who</b></div>
          <div className="ops-body">
            <h2 className="h2">Con người và phòng ban{agents && <span className="tone-agent"> — và AI agent</span>}.</h2>
            <p>Mỗi người{agents && <span className="tone-agent"> — kể cả agent</span>} đều có tên, mục tiêu và nhiệm vụ.</p>
            <div className="ops-actors">
              {PEOPLE.map(p => <span key={p} className="actor human">{!PERSONS.includes(p) ? <Building2 size={16} /> : <User size={16} />}{p}</span>)}
              {AGENTS.map((a, i) => (
                <Reveal key={a} at={1} delay={0.1 + i * 0.12} from="left"><span className="actor agent"><Bot size={16} />{a}</span></Reveal>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal at={0} delay={0.9} className="ops-row">
          <div className="ops-key"><span className="stop-n">02</span><b>The Interfaces</b></div>
          <div className="ops-body">
            <h2 className="h2">Chức năng: đầu vào và đầu ra của công việc.</h2>
            <p>Đầu ra của bên này là đầu vào của bên kia. Hiện tại: vẫn là monolith, như Amazon 20 năm trước.</p>
          </div>
        </Reveal>
        <Reveal at={0} delay={1.5} className="ops-row">
          <div className="ops-key"><span className="stop-n">03</span><b>The How</b></div>
          <div className="ops-body">
            <h2 className="h2">Mỗi bên làm việc độc lập.</h2>
            <p>Được giao việc — đôi khi kèm quy trình — chứ không giao lời giải.</p>
          </div>
        </Reveal>
      </div>
    </SlideFrame>
  )
}
