export const GLITCH_CHARS = '!<>-_\\/[]{}=+*^?#01ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const MIN_TICKS = 14
export const MAX_TICKS = 20
export const TICK_INTERVAL_MS = 50
export const CASCADE_MS = 500
export const JITTER_MS = 120

export function charStartDelay(index: number, lastIndex: number): number {
  const position = lastIndex > 0 ? index / lastIndex : 0
  return position * CASCADE_MS + Math.random() * JITTER_MS
}

export function randomChar(): string {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
}

export function scrambled(text: string): string[] {
  return text.split('').map((c) => (c === ' ' ? ' ' : randomChar()))
}
