import { useGame } from '../game/GameContext'
import { getLevel } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell } from '../components/ScreenShell'
import { LevelAnswerForm } from '../components/LevelAnswerForm'
import './TerminalScreen.css'

export function TerminalScreen() {
  const { state } = useGame()
  const level = getLevel(LevelId.Terminal)

  return (
    <ScreenShell title={level.title}>
      <p>{level.narrative(state)}</p>
      <p className="terminal-hidden-clue">GHOST99</p>
      <LevelAnswerForm placeholder="Code d'accès" />
    </ScreenShell>
  )
}
