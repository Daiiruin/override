import { GameProvider, useGame } from './game/GameContext'
import { LevelId } from './game/types'
import { TimerBar } from './components/TimerBar'
import { IntroScreen } from './screens/IntroScreen'
import { TerminalScreen } from './screens/TerminalScreen'
import { InterceptScreen } from './screens/InterceptScreen'

function Game() {
  const { state } = useGame()

  switch (state.currentScreen) {
    case 'intro':
      return <IntroScreen />
    case LevelId.Terminal:
      return <TerminalScreen />
    case LevelId.Intercept:
      return <InterceptScreen />
    default:
      return null
  }
}

export function App() {
  return (
    <GameProvider>
      <TimerBar />
      <Game />
    </GameProvider>
  )
}
