import { useGame } from '../game/GameContext'
import { getLevel } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell } from '../components/ScreenShell'
import { LevelAnswerForm } from '../components/LevelAnswerForm'

export function IdentityScreen() {
  const { state } = useGame()
  const level = getLevel(LevelId.Identity)

  return (
    <ScreenShell title={level.title}>
      <p>{level.narrative(state)}</p>
      <LevelAnswerForm placeholder="Ton prénom" />
    </ScreenShell>
  )
}
