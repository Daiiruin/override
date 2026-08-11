export interface SaveData {
  playerName: string
  currentScreen: string
  collectedCodes: Record<string, string>
  deadlineTimestamp: number
  victory: boolean
}

const STORAGE_KEY = 'override:save:v1'

export function loadSave(): SaveData | null {
  const raw = window.localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as SaveData
  } catch {
    return null
  }
}

export function saveSave(data: SaveData): void {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function clearSave(): void {
  window.localStorage.removeItem(STORAGE_KEY)
}
