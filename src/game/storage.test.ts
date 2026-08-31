import { describe, it, expect, beforeEach } from 'vitest'
import { loadSave, saveSave, clearSave, type SaveData } from './storage'

const sample: SaveData = {
  playerName: 'Ada',
  currentScreen: 'terminal',
  collectedCodes: { terminal: 'GHOST99' },
  deadlineTimestamp: 123456,
  victory: false,
  forcedGameOver: false,
}

describe('storage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('returns null when there is no save', () => {
    expect(loadSave()).toBeNull()
  })

  it('round-trips a save through localStorage', () => {
    saveSave(sample)
    expect(loadSave()).toEqual(sample)
  })

  it('removes the save on clearSave', () => {
    saveSave(sample)
    clearSave()
    expect(loadSave()).toBeNull()
  })

  it('returns null for corrupted JSON instead of throwing', () => {
    window.localStorage.setItem('override:save:v1', '{not-json')
    expect(loadSave()).toBeNull()
  })
})
