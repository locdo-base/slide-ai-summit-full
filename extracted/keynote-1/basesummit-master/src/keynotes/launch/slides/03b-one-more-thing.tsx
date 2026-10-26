import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { Reveal } from '../../../ui/Reveal'
import { Brand, useBrand } from '../../../ui/Brand'
import { SlideFrame } from '../../../ui/SlideFrame'
import { useStep } from '../../../engine/step'
import { ScenePlayer, SceneWalk, SceneCaption, SceneStage, SceneControls, ramp, clock, type Scene } from '../../../fx/ScenePlayer'
import { StudioBuild, CrmReport, HrReport, LandingPage, SlidesDeck, buildTimes, useSpecs } from '../../../mocks/StudioDemo'
import { Beyond, Supports } from '../../../mocks/StudioExtras'

/* The keynote's "one more thing": the tease alone on the dark stage; one
 * click, one question to the room — how were today's keynotes?; one more click and the demo
 * runs itself: six scenes, each a build step, playing on from one to the
 * next (see fx/ScenePlayer). Laid out like the screen slides: the headline,
 * the playing scene's line and the list of scenes in the left column, the
 * scene itself to the right, running off the stage; the notes carry Eric's
 * narration per scene. */

/** The build step the demo starts at: 0 tease · 1 words · 2… scenes. */
export const DEMO_AT = 2

const B = () => <>{useBrand().wordmark}</>
const Host = () => <>platform.{useBrand().domain}</>
/** Copy in the scene list, resolved where it renders (the list is module data). */
const T = ({ c }: { c: ReactNode }) => <>{c}</>

function CrmScene({ t }: { t: number }) {
  const s = useSpecs()
  return <StudioBuild spec={s.crm} t={t}><CrmReport p={ramp(t, buildTimes(s.crm).tReady + 0.3, 1.4)} /></StudioBuild>
}
function HrScene({ t }: { t: number }) {
  const s = useSpecs()
  return <StudioBuild spec={s.hr} t={t}><HrReport p={ramp(t, buildTimes(s.hr).tReady + 0.3, 1.4)} /></StudioBuild>
}
function LandingScene({ t }: { t: number }) {
  const s = useSpecs()
  const { tReady } = buildTimes(s.landing)
  // the page builds in, then rolls down through its sections over eight seconds and holds at the registration
  return <StudioBuild spec={s.landing} t={t}><LandingPage p={clock(t, tReady + 0.2, 2.6)} scroll={ramp(t, tReady + 3.2, 8)} /></StudioBuild>
}
function SlidesScene({ t }: { t: number }) {
  const s = useSpecs()
  return <StudioBuild spec={s.slides} t={t}><SlidesDeck p={clock(t, buildTimes(s.slides).tReady + 0.2, 3)} /></StudioBuild>
}

const SCENES: Scene[] = [
  {
    id: 'slides', name: 'Slides · Chính keynote này', dur: 15, component: SlidesScene,
    title: <T c="Slide thuyết trình" />,
    caption: <T c="Chỉ một câu prompt — bộ slide hôm nay được làm bằng AI Studio › Slides, cùng Claude Code." />,
  },
  {
    id: 'crm', name: 'Apps · Báo cáo CRM', dur: 18, component: CrmScene,
    title: <T c="Apps: Báo cáo CRM" />,
    caption: <T c=<>Một app tự động tích hợp với <B />, và hiểu dữ liệu Sales của các bạn.</> />,
  },
  {
    id: 'hr', name: 'Apps · Báo cáo nhân sự', dur: 13, component: HrScene,
    title: <T c="Báo cáo nhân sự" />,
    caption: <T c="Cùng một cách — dữ liệu nhân sự và tuyển dụng đã có sẵn." />,
  },
  {
    id: 'landing', name: 'Pages · Landing page', dur: 18, component: LandingScene,
    title: 'Landing page',
    caption: <T c="“Tạo landing page cho sự kiện AI Summit 2026.”" />,
  },
  {
    id: 'beyond', name: 'Studio → Base.vn → Claude Code', dur: 13, component: Beyond,
    title: <>Studio → <B /> → Claude Code</>,
    caption: <T c="Không thay thế Claude Code: tạo bản v0 hiểu dữ liệu của các bạn, rồi tiếp tục trên công cụ các bạn chọn." />,
  },
  {
    id: 'supports', name: 'Publish · Database', dur: 18, component: Supports,
    title: 'Publish & Database',
    caption: <T c=<>Chạy ngay trên <Host />; Postgres hoặc MySQL khi các bạn cần.</> />,
  },
]

/** Build steps the slide needs: the words, then one per scene. */
export const ONE_MORE_THING_STEPS = 1 + SCENES.length

export function OneMoreThingSlide() {
  const step = useStep()
  return (
    <>
      <Reveal at={0} until={1} from="none" className="omt">
        <Brand corner />
        <div className="omt-words"><span className="display">One more thing!</span></div>
      </Reveal>

      <Reveal at={1} until={DEMO_AT} from="none" className="omt">
        <Brand corner />
        <div className="omt-words"><span className="display omt-ask">Bạn thấy nội dung các keynotes của chúng tôi hôm nay như thế nào?</span></div>
      </Reveal>

      {/* Mounted only once the demo starts: the player's clock and keys must not run before. */}
      {step >= DEMO_AT && (
        <motion.div className="omt-reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <ScenePlayer scenes={SCENES} firstStep={DEMO_AT}>
            <SlideFrame
              chapter="releases"
              layout="split"
              headline="AI Studio."
              lead={<SceneCaption />}
              aside={<SceneWalk />}
              figureClass="bleed screens studio"
            >
              <div className="screen"><SceneStage /></div>
              <SceneControls />
            </SlideFrame>
          </ScenePlayer>
        </motion.div>
      )}
    </>
  )
}
