import { useGame } from '../game/GameContext'
import { formatDuration } from '../game/timer'
import './TimerBar.css'

const CRITICAL_THRESHOLD_MS = 60_000

export function TimerBar() {
  const { state, msLeft } = useGame()
  if (state.deadlineTimestamp === null || state.currentScreen === 'end') return null

  const isCritical = msLeft <= CRITICAL_THRESHOLD_MS

  return (
    <div className={`timer-bar${isCritical ? ' timer-bar--critical' : ''}`}>
      <span>NEXUS OVERRIDE DANS</span>
      <span>{formatDuration(msLeft)}</span>
    </div>
  )
}
