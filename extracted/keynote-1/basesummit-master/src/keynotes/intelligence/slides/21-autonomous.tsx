import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { OPS_WALK } from '../../../mocks/OpsWalkMock'

/* SOA's third principle, made concrete: standardising services does not make
   the apps weaker — the standard sits at definition, configuration and how
   services talk; what each can execute has no ceiling. The proof is three
   screens walked on their own — a simple service operation, a complex one,
   and one with complex work orchestration inside — with the walk's indicator
   under the lead. No click. */
export function AutonomousSlide() {
  return (
    <Walk steps={OPS_WALK}>
      <ScreenSlide
        chapter="services"
        headline="Mạnh mẽ: tự vận hành & phát triển độc lập."
        lead="Chuẩn hoá cách service được định nghĩa và kết nối. Không giới hạn những gì mỗi service có thể làm."
        aside={<WalkBar />}
        screens={[{ mock: 'ops-walk' }]}
      />
    </Walk>
  )
}
