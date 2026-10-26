import { SlideFrame } from '../../../ui/SlideFrame'
import { Callout } from '../../../mocks/Window'
import { MockWindow } from '../../../mocks/catalog'
import { useStep } from '../../../engine/step'

/* Models: the catalog with your own keys; on the second click the usage
   report takes the window's place — spend, requests, tokens across providers. */
export function ModelsSlide() {
  const step = useStep()
  return (
    <SlideFrame
      chapter="anatomy"
      layout="stack"
      headline="LLM model: Any. Our keys or yours."
      lead="All frontier models, or bring your own API keys."
      lead2="Logging and usage reports in every scenario — per person, per model, per day."
      lead2At={2}
      figureClass="bleed"
    >
      {step < 2 && <MockWindow id="models" x={0} y={0} />}
      {step < 2 && <Callout target="setup" label="bring your own key — it stays on your account" at={1} side="up-right" />}
      <MockWindow id="usage" x={0} y={0} at={2} />
    </SlideFrame>
  )
}
