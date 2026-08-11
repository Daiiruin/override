export enum LevelId {
  Terminal = 'terminal',
  Intercept = 'intercept',
  FileSystem = 'filesystem',
  Binary = 'binary',
  Firewall = 'firewall',
  Identity = 'identity',
  Finale = 'finale',
}

export type ScreenId = 'intro' | LevelId | 'end'

export interface GameState {
  playerName: string
  currentScreen: ScreenId
  collectedCodes: Partial<Record<LevelId, string>>
  deadlineTimestamp: number | null
  victory: boolean
}

export interface LevelDefinition {
  id: LevelId
  next: ScreenId
  title: string
  narrative: (state: GameState) => string
  validate: (input: string, state: GameState) => boolean
}
