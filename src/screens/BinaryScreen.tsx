import { useGame } from '../game/GameContext'
import { getLevel } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell } from '../components/ScreenShell'
import { LevelAnswerForm } from '../components/LevelAnswerForm'

export function BinaryScreen() {
  const { state } = useGame()
  const level = getLevel(LevelId.Binary)

  return (
    <ScreenShell title={level.title}>
      <p style={{ wordBreak: 'break-all' }}>{level.narrative(state)}</p>
      <LevelAnswerForm placeholder="Mot décodé" />
    </ScreenShell>
  )
}
