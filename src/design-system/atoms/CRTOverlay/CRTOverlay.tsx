import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { Wrapper, Scanlines, Vignette } from './CRTOverlay.styles'

export function CRTOverlay() {
  const reducedMotion = useReducedMotion()
  if (reducedMotion) return null

  return (
    <Wrapper aria-hidden="true">
      <Scanlines />
      <Vignette />
    </Wrapper>
  )
}
