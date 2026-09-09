import { describe, it, expect } from 'vitest'
import {
  charStartDelay,
  randomChar,
  scrambled,
  GLITCH_CHARS,
  CASCADE_MS,
  JITTER_MS,
} from './glitchTiming'

describe('charStartDelay', () => {
  it('starts the first character near 0ms', () => {
    const delay = charStartDelay(0, 5)
    expect(delay).toBeGreaterThanOrEqual(0)
    expect(delay).toBeLessThan(JITTER_MS)
  })

  it('starts the last character near CASCADE_MS', () => {
    const delay = charStartDelay(5, 5)
    expect(delay).toBeGreaterThanOrEqual(CASCADE_MS)
    expect(delay).toBeLessThan(CASCADE_MS + JITTER_MS)
  })

  it('handles a single-character string without dividing by zero', () => {
    expect(Number.isFinite(charStartDelay(0, 0))).toBe(true)
  })
})

describe('randomChar', () => {
  it('always returns one character from GLITCH_CHARS', () => {
    for (let i = 0; i < 20; i++) {
      expect(GLITCH_CHARS).toContain(randomChar())
    }
  })
})

describe('scrambled', () => {
  it('preserves spaces and string length', () => {
    const result = scrambled('AB CD')
    expect(result).toHaveLength(5)
    expect(result[2]).toBe(' ')
  })
})
