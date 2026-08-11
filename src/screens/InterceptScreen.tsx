import { useGame } from '../game/GameContext'
import { getLevel } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell } from '../components/ScreenShell'
import { LevelAnswerForm } from '../components/LevelAnswerForm'

export function InterceptScreen() {
  const { state } = useGame()
  const level = getLevel(LevelId.Intercept)

  return (
    <ScreenShell title={level.title}>
      <p>{level.narrative(state)}</p>
      <LevelAnswerForm placeholder="Message décodé" />
    </ScreenShell>
  )
}
