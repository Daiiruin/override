import { describe, it, expect } from 'vitest'
import {
  LEVELS,
  LEVEL_ORDER,
  getLevel,
  INTERCEPT_ANSWER,
  LOG_ANSWER,
  FIREWALL_ANSWER,
  KEYPAD_CLEARED_SIGNAL,
  BOTS_CLEARED_SIGNAL,
  DEFENSE_CLEARED_SIGNAL,
} from './levels'
import { LevelId, type GameState } from './types'

const baseState: GameState = {
  playerName: 'Ada',
  currentScreen: LevelId.Terminal,
  collectedCodes: {},
  deadlineTimestamp: null,
  victory: false,
  forcedGameOver: false,
}

describe('LEVELS', () => {
  it('defines the 8 levels in the expected order', () => {
    expect(LEVELS.map((level) => level.id)).toEqual([
      LevelId.Terminal,
      LevelId.Intercept,
      LevelId.FileSystem,
      LevelId.Logs,
      LevelId.Firewall,
      LevelId.Keypad,
      LevelId.Defense,
      LevelId.Finale,
    ])
  })

  it('chains the last level to the "end" screen', () => {
    expect(LEVELS[LEVELS.length - 1].next).toBe('end')
  })

  it('exposes LEVEL_ORDER with all 8 level ids in play order', () => {
    expect(LEVEL_ORDER).toEqual([
      LevelId.Terminal,
      LevelId.Intercept,
      LevelId.FileSystem,
      LevelId.Logs,
      LevelId.Firewall,
      LevelId.Keypad,
      LevelId.Defense,
      LevelId.Finale,
    ])
  })

  it('validates the intercept answer case-insensitively', () => {
    expect(
      getLevel(LevelId.Intercept).validate(INTERCEPT_ANSWER.toLowerCase(), baseState),
    ).toBe(true)
  })

  it('validates the system log answer', () => {
    expect(getLevel(LevelId.Logs).validate(LOG_ANSWER, baseState)).toBe(true)
  })

  it('validates the firewall sequence', () => {
    expect(getLevel(LevelId.Firewall).validate(FIREWALL_ANSWER, baseState)).toBe(true)
  })

  it('validates the keypad level only on the cleared signal', () => {
    expect(getLevel(LevelId.Keypad).validate(KEYPAD_CLEARED_SIGNAL, baseState)).toBe(true)
    expect(getLevel(LevelId.Keypad).validate('wrong', baseState)).toBe(false)
  })

  it('validates the defense level only on the cleared signal', () => {
    expect(getLevel(LevelId.Defense).validate(DEFENSE_CLEARED_SIGNAL, baseState)).toBe(true)
    expect(getLevel(LevelId.Defense).validate('DELETE', baseState)).toBe(false)
  })

  it('validates the finale level only on the cleared signal', () => {
    expect(getLevel(LevelId.Finale).validate(BOTS_CLEARED_SIGNAL, baseState)).toBe(true)
    expect(getLevel(LevelId.Finale).validate('wrong', baseState)).toBe(false)
  })
})
