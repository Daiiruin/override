export enum LevelId {
  Terminal = 'terminal',
  Intercept = 'intercept',
  FileSystem = 'filesystem',
  Logs = 'logs',
  Firewall = 'firewall',
  Keypad = 'keypad',
  Defense = 'defense',
  Finale = 'finale',
}

export type ScreenId = 'intro' | LevelId | 'end'

export interface GameState {
  playerName: string
  currentScreen: ScreenId
  collectedCodes: Partial<Record<LevelId, string>>
  deadlineTimestamp: number | null
  victory: boolean
  forcedGameOver: boolean
}

export interface LevelDefinition {
  id: LevelId
  next: ScreenId
  title: string
  narrative: (state: GameState) => string
  validate: (input: string, state: GameState) => boolean
}
