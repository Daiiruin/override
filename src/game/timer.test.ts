import { describe, it, expect } from 'vitest'
import {
  GAME_DURATION_MS,
  computeDeadline,
  msRemaining,
  formatDuration,
} from './timer'

describe('computeDeadline', () => {
  it('adds the game duration to the given timestamp', () => {
    expect(computeDeadline(1000)).toBe(1000 + GAME_DURATION_MS)
  })
})

describe('msRemaining', () => {
  it('returns the difference between deadline and now', () => {
    expect(msRemaining(10000, 4000)).toBe(6000)
  })

  it('never returns a negative value', () => {
    expect(msRemaining(1000, 5000)).toBe(0)
  })
})

describe('formatDuration', () => {
  it('formats milliseconds as mm:ss', () => {
    expect(formatDuration(65000)).toBe('01:05')
  })

  it('pads single-digit minutes and seconds', () => {
    expect(formatDuration(5000)).toBe('00:05')
  })

  it('rounds up partial seconds so the display never shows a false zero', () => {
    expect(formatDuration(500)).toBe('00:01')
  })
})
