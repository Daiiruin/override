import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../../../hooks/useReducedMotion'
import { Dot, Trail } from './CustomCursor.styles'

export type CursorState = 'default' | 'link' | 'text'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], summary'
const TEXT_SELECTOR =
  'input:not([type="submit"]):not([type="checkbox"]), textarea, [contenteditable="true"]'
const LERP_FACTOR = 0.25

export function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const [pointerFine] = useState(
    () => window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const enabled = pointerFine && !reducedMotion
  const [state, setState] = useState<CursorState>('default')

  const dotRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: -100, y: -100 })
  const trail = useRef({ x: -100, y: -100 })
  const frameId = useRef(0)

  useEffect(() => {
    if (!enabled) return

    document.body.classList.add('custom-cursor-active')

    function handleMove(event: PointerEvent) {
      pointer.current = { x: event.clientX, y: event.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`
      }
      const target = event.target as Element
      if (target.closest(TEXT_SELECTOR)) setState('text')
      else if (target.closest(INTERACTIVE_SELECTOR)) setState('link')
      else setState('default')
    }

    function tick() {
      trail.current.x += (pointer.current.x - trail.current.x) * LERP_FACTOR
      trail.current.y += (pointer.current.y - trail.current.y) * LERP_FACTOR
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x}px, ${trail.current.y}px)`
      }
      frameId.current = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', handleMove)
    frameId.current = requestAnimationFrame(tick)

    return () => {
      document.body.classList.remove('custom-cursor-active')
      window.removeEventListener('pointermove', handleMove)
      cancelAnimationFrame(frameId.current)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <Trail ref={trailRef} $state={state} aria-hidden="true" />
      <Dot ref={dotRef} aria-hidden="true" />
    </>
  )
}
