import { useGame } from '../game/GameContext'
import { getLevel } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell, Divider } from '../components/ScreenShell'
import { LevelAnswerForm } from '../components/LevelAnswerForm'
import { HiddenClue } from './TerminalScreen.styles'

export function TerminalScreen() {
  const { state } = useGame()
  const level = getLevel(LevelId.Terminal)

  return (
    <ScreenShell title={level.title}>
      <p>{level.narrative(state)}</p>
      <HiddenClue>GHOST99</HiddenClue>
      <Divider />
      <LevelAnswerForm placeholder="Code d'accès" />
    </ScreenShell>
  )
}
