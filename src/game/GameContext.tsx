import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { LevelId, type GameState, type ScreenId } from './types'
import { getLevel, LEVELS } from './levels'
import { computeDeadline, msRemaining, PENALTY_MS } from './timer'
import { loadSave, saveSave, clearSave, type SaveData } from './storage'

const PENALTY_FLASH_MS = 1000

export interface GameContextValue {
  state: GameState
  msLeft: number
  isGameOver: boolean
  isPenaltyFlashing: boolean
  start: (name: string) => void
  solveLevel: (input: string) => boolean
  forceDefeat: () => void
  penalize: () => void
  restart: () => void
}

const INITIAL_STATE: GameState = {
  playerName: '',
  currentScreen: 'intro',
  collectedCodes: {},
  deadlineTimestamp: null,
  victory: false,
  forcedGameOver: false,
}

function toSaveData(state: GameState): SaveData {
  return {
    playerName: state.playerName,
    currentScreen: state.currentScreen,
    collectedCodes: state.collectedCodes as Record<string, string>,
    deadlineTimestamp: state.deadlineTimestamp ?? 0,
    victory: state.victory,
    forcedGameOver: state.forcedGameOver,
  }
}

function fromSaveData(data: SaveData): GameState {
  return {
    playerName: data.playerName,
    currentScreen: data.currentScreen as ScreenId,
    collectedCodes: data.collectedCodes as Partial<Record<LevelId, string>>,
    deadlineTimestamp: data.deadlineTimestamp || null,
    victory: data.victory,
    forcedGameOver: data.forcedGameOver,
  }
}

const GameContext = createContext<GameContextValue | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GameState>(() => {
    const saved = loadSave()
    return saved ? fromSaveData(saved) : INITIAL_STATE
  })
  const [msLeft, setMsLeft] = useState<number>(() =>
    state.deadlineTimestamp ? msRemaining(state.deadlineTimestamp, Date.now()) : 0,
  )
  const [isPenaltyFlashing, setIsPenaltyFlashing] = useState(false)

  useEffect(() => {
    if (!state.deadlineTimestamp || state.currentScreen === 'end') return
    const deadline = state.deadlineTimestamp
    const interval = window.setInterval(() => {
      setMsLeft(msRemaining(deadline, Date.now()))
    }, 1000)
    return () => window.clearInterval(interval)
  }, [state.deadlineTimestamp, state.currentScreen])

  useEffect(() => {
    if (state.currentScreen === 'intro') return
    saveSave(toSaveData(state))
  }, [state])

  const isGameOver =
    state.forcedGameOver ||
    (state.deadlineTimestamp !== null && msLeft <= 0 && state.currentScreen !== 'end')

  function start(name: string) {
    const deadlineTimestamp = computeDeadline(Date.now())
    const next: GameState = {
      ...INITIAL_STATE,
      playerName: name,
      currentScreen: LEVELS[0].id,
      deadlineTimestamp,
    }
    setState(next)
    setMsLeft(msRemaining(deadlineTimestamp, Date.now()))
  }

  function solveLevel(input: string): boolean {
    if (state.currentScreen === 'intro' || state.currentScreen === 'end') return false
    const level = getLevel(state.currentScreen as LevelId)
    if (!level.validate(input, state)) return false
    const collectedCodes = {
      ...state.collectedCodes,
      [level.id]: input.trim().toUpperCase(),
    }
    setState({
      ...state,
      collectedCodes,
      currentScreen: level.next,
      victory: level.next === 'end' ? true : state.victory,
    })
    return true
  }

  function forceDefeat() {
    setState((current) => ({ ...current, forcedGameOver: true }))
  }

  function penalize() {
    setState((current) => {
      if (current.deadlineTimestamp === null) return current
      return { ...current, deadlineTimestamp: current.deadlineTimestamp - PENALTY_MS }
    })
    setMsLeft((current) => Math.max(0, current - PENALTY_MS))
    setIsPenaltyFlashing(true)
    window.setTimeout(() => setIsPenaltyFlashing(false), PENALTY_FLASH_MS)
  }

  function restart() {
    clearSave()
    setState(INITIAL_STATE)
    setMsLeft(0)
  }

  return (
    <GameContext.Provider
      value={{
        state,
        msLeft,
        isGameOver,
        isPenaltyFlashing,
        start,
        solveLevel,
        forceDefeat,
        penalize,
        restart,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error('useGame must be used within a GameProvider')
  return ctx
}
