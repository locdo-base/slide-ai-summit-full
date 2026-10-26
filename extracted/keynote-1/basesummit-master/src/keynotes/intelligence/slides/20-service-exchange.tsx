import { ScreenSlide } from '../../../ui/ScreenSlide'
import { Walk, WalkBar } from '../../../ui/Walk'
import { EXCHANGE_WALK } from '../../../mocks/ExchangeWalkMock'

/* Services connect to each other at the platform layer: pick the connection
   model, map field to field, and see from inside each service what it is
   connected to. Two screens walked on their own — a service's exchanges,
   then one exchange opened on its field mapping — with the walk's indicator
   under the lead. No click. */
export function ServiceExchangeSlide() {
  return (
    <Walk steps={EXCHANGE_WALK}>
      <ScreenSlide
        chapter="services"
        headline="Kết nối mạnh mẽ."
        lead={<>Không phải là kết nối phụ thuộc <span style={{ whiteSpace: 'nowrap' }}>app-to-app</span>, mà là kết nối chủ động linh hoạt <span style={{ whiteSpace: 'nowrap' }}>service-to-service</span>.</>}
        aside={<WalkBar />}
        screens={[{ mock: 'exchange-walk' }]}
      />
    </Walk>
  )
}
