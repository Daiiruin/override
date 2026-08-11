import { useGame } from '../game/GameContext'
import { getLevel } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell } from '../components/ScreenShell'
import { LevelAnswerForm } from '../components/LevelAnswerForm'
import { GlitchText } from '../components/GlitchText'

export function FinaleScreen() {
  const { state } = useGame()
  const level = getLevel(LevelId.Finale)

  return (
    <ScreenShell title={level.title}>
      <GlitchText as="h2" text="NOYAU DE NEXUS INSTABLE" />
      <p>{level.narrative(state)}</p>
      <LevelAnswerForm placeholder="CODE-CODE-CODE" />
    </ScreenShell>
  )
}
