import { useGame } from '../game/GameContext'
import { formatDuration } from '../game/timer'
import { getLevel, LEVEL_ORDER } from '../game/levels'
import { LevelId } from '../game/types'
import { Bar, AgentSegment, LevelSegment, Countdown } from './TimerBar.styles'

const CRITICAL_THRESHOLD_MS = 60_000

export function TimerBar() {
  const { state, msLeft, isPenaltyFlashing } = useGame()
  if (state.deadlineTimestamp === null || state.currentScreen === 'end') return null

  const isCritical = msLeft <= CRITICAL_THRESHOLD_MS
  const levelId = state.currentScreen as LevelId
  const levelIndex = LEVEL_ORDER.indexOf(levelId) + 1
  const levelTitle = getLevel(levelId).title

  return (
    <Bar $critical={isCritical} $penalty={isPenaltyFlashing}>
      <AgentSegment>AGENT: {state.playerName.toUpperCase()}</AgentSegment>
      <LevelSegment>
        LVL {String(levelIndex).padStart(2, '0')}/{LEVEL_ORDER.length} — {levelTitle}
      </LevelSegment>
      <Countdown>{formatDuration(msLeft)}</Countdown>
    </Bar>
  )
}
