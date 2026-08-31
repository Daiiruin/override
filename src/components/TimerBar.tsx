import { useGame } from '../game/GameContext'
import { formatDuration } from '../game/timer'
import './TimerBar.css'

const CRITICAL_THRESHOLD_MS = 60_000

export function TimerBar() {
  const { state, msLeft, isPenaltyFlashing } = useGame()
  if (state.deadlineTimestamp === null || state.currentScreen === 'end') return null

  const isCritical = msLeft <= CRITICAL_THRESHOLD_MS

  const classNames = ['timer-bar']
  if (isPenaltyFlashing) classNames.push('timer-bar--penalty')
  else if (isCritical) classNames.push('timer-bar--critical')

  return (
    <div className={classNames.join(' ')}>
      <span>NEXUS OVERRIDE DANS</span>
      <span>{formatDuration(msLeft)}</span>
    </div>
  )
}
