import { describe, it, expect } from 'vitest'
import { caesarShift, textToBinary, binaryToText } from './cipher'

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

describe('textToBinary / binaryToText', () => {
  it('round-trips a word through binary', () => {
    const binary = textToBinary('OVERRIDE')
    expect(binaryToText(binary)).toBe('OVERRIDE')
  })

  it('encodes a known word to its expected binary form', () => {
    expect(textToBinary('HI')).toBe('01001000 01001001')
  })
})
