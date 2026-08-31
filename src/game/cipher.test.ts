import { describe, it, expect } from 'vitest'
import { caesarShift } from './cipher'

describe('caesarShift', () => {
  it('shifts letters forward and wraps around the alphabet', () => {
    expect(caesarShift('NIGHTFALL', 3)).toBe('QLJKWIDOO')
  })

  it('shifts letters backward to decode', () => {
    expect(caesarShift('QLJKWIDOO', -3)).toBe('NIGHTFALL')
  })

  it('leaves non-letter characters unchanged', () => {
    expect(caesarShift('GHOST-99', 5)).toBe('LMTXY-99')
  })
})
