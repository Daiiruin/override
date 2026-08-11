import { GameProvider, useGame } from './game/GameContext'
import { TimerBar } from './components/TimerBar'
import { IntroScreen } from './screens/IntroScreen'

function Game() {
  const { state } = useGame()

  switch (state.currentScreen) {
    case 'intro':
      return <IntroScreen />
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
