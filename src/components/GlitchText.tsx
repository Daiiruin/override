import { useEffect, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import {
  charStartDelay,
  randomChar,
  scrambled,
  MIN_TICKS,
  MAX_TICKS,
  TICK_INTERVAL_MS,
} from './glitchTiming'
import { StyledGlitchText } from './GlitchText.styles'

interface GlitchTextProps {
  text: string
  as?: 'h1' | 'h2' | 'p' | 'span'
  className?: string
}

export function GlitchText({ text, as = 'span', className }: GlitchTextProps) {
  const reducedMotion = useReducedMotion()
  const [prevText, setPrevText] = useState(text)
  const [chars, setChars] = useState(() => (reducedMotion ? text.split('') : scrambled(text)))

  if (text !== prevText) {
    setPrevText(text)
    setChars(reducedMotion ? text.split('') : scrambled(text))
  }

  useEffect(() => {
    if (reducedMotion) return

    const timeouts: ReturnType<typeof setTimeout>[] = []
    const target = prevText.split('')
    const lastIndex = target.length - 1

    target.forEach((char, index) => {
      if (char === ' ') return

      const totalTicks = MIN_TICKS + Math.floor(Math.random() * (MAX_TICKS - MIN_TICKS + 1))
      let tick = 0

      const step = () => {
        tick += 1
        const done = tick >= totalTicks
        setChars((prev) => {
          const next = [...prev]
          next[index] = done ? char : randomChar()
          return next
        })
        if (!done) {
          timeouts[index] = setTimeout(step, TICK_INTERVAL_MS)
        }
      }

      timeouts[index] = setTimeout(step, charStartDelay(index, lastIndex))
    })

    return () => timeouts.forEach(clearTimeout)
  }, [prevText, reducedMotion])

  return (
    <StyledGlitchText as={as} className={className} aria-label={text}>
      {chars.join('')}
    </StyledGlitchText>
  )
}
