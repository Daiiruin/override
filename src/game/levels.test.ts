import { describe, it, expect } from 'vitest'
import {
  LEVELS,
  getLevel,
  INTERCEPT_ANSWER,
  BINARY_ANSWER,
  FIREWALL_ANSWER,
} from './levels'
import { LevelId, type GameState } from './types'

const baseState: GameState = {
  playerName: 'Ada',
  currentScreen: LevelId.Terminal,
  collectedCodes: {},
  deadlineTimestamp: null,
  victory: false,
}

describe('LEVELS', () => {
  it('defines the 7 levels in the expected order', () => {
    expect(LEVELS.map((level) => level.id)).toEqual([
      LevelId.Terminal,
      LevelId.Intercept,
      LevelId.FileSystem,
      LevelId.Binary,
      LevelId.Firewall,
      LevelId.Identity,
      LevelId.Finale,
    ])
  })

  it('chains the last level to the "end" screen', () => {
    expect(LEVELS[LEVELS.length - 1].next).toBe('end')
  })

  it('validates the intercept answer case-insensitively', () => {
    expect(
      getLevel(LevelId.Intercept).validate(INTERCEPT_ANSWER.toLowerCase(), baseState),
    ).toBe(true)
  })

  it('validates the binary answer', () => {
    expect(getLevel(LevelId.Binary).validate(BINARY_ANSWER, baseState)).toBe(true)
  })

  it('validates the firewall sequence', () => {
    expect(getLevel(LevelId.Firewall).validate(FIREWALL_ANSWER, baseState)).toBe(true)
  })

  it('validates the identity level against the player name in state', () => {
    expect(getLevel(LevelId.Identity).validate('ada', baseState)).toBe(true)
    expect(getLevel(LevelId.Identity).validate('bob', baseState)).toBe(false)
  })

  it('validates the finale answer as the collected codes joined with dashes', () => {
    const state: GameState = {
      ...baseState,
      collectedCodes: {
        [LevelId.Terminal]: 'GHOST99',
        [LevelId.Binary]: 'OVERRIDE',
        [LevelId.Intercept]: 'NIGHTFALL',
      },
    }
    expect(
      getLevel(LevelId.Finale).validate('GHOST99-OVERRIDE-NIGHTFALL', state),
    ).toBe(true)
  })
})
