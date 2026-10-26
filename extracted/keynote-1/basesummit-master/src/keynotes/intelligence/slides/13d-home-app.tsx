import { ScreenSlide } from '../../../ui/ScreenSlide'

/* Where full business context shows up: the Home app. The Service Assistant
   works one question through the services a person can reach, the hubs light
   the services it touched. The words on the left, the app on the right, playing
   on its own. No click. */
export function HomeAppSlide() {
  return (
    <ScreenSlide
      chapter="operation"
      headline="Khi chúng ta đã có đầy đủ business context."
      lead="Base Home app: một nơi chung để con người có thể làm việc cùng agents trên tất cả các services."
      screens={[{ mock: 'home-app' }]}
    />
  )
}
