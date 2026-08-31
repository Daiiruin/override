import { useGame } from '../game/GameContext'
import { getLevel, INTERCEPT_SHIFT } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell } from '../components/ScreenShell'
import { LevelAnswerForm } from '../components/LevelAnswerForm'
import { CipherDecoderTable } from '../components/CipherDecoderTable'

export function InterceptScreen() {
  const { state } = useGame()
  const level = getLevel(LevelId.Intercept)

  return (
    <ScreenShell title={level.title}>
      <p>{level.narrative(state)}</p>
      <CipherDecoderTable shift={INTERCEPT_SHIFT} />
      <LevelAnswerForm placeholder="Message décodé" />
    </ScreenShell>
  )
}
