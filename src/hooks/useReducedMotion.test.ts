import { describe, it, expect, vi, afterEach } from 'vitest'
import { useReducedMotion } from './useReducedMotion'

function mockMatchMedia(matches: boolean) {
  const listeners: Array<(e: MediaQueryListEvent) => void> = []
  window.matchMedia = vi.fn().mockImplementation(() => ({
    matches,
    addEventListener: (_: string, cb: (e: MediaQueryListEvent) => void) => listeners.push(cb),
    removeEventListener: vi.fn(),
  }))
  return listeners
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('useReducedMotion', () => {
  it('is exported as a function', () => {
    mockMatchMedia(false)
    expect(typeof useReducedMotion).toBe('function')
  })
})
