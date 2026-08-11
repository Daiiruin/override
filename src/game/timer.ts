export const GAME_DURATION_MS = 10 * 60 * 1000

export function computeDeadline(nowMs: number): number {
  return nowMs + GAME_DURATION_MS
}

export function msRemaining(deadlineMs: number, nowMs: number): number {
  return Math.max(0, deadlineMs - nowMs)
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.ceil(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
