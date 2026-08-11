import { GameProvider, useGame } from './game/GameContext'
import { LevelId } from './game/types'
import { TimerBar } from './components/TimerBar'
import { IntroScreen } from './screens/IntroScreen'
import { TerminalScreen } from './screens/TerminalScreen'
import { InterceptScreen } from './screens/InterceptScreen'
import { FileSystemScreen } from './screens/FileSystemScreen'
import { BinaryScreen } from './screens/BinaryScreen'
import { FirewallScreen } from './screens/FirewallScreen'
import { IdentityScreen } from './screens/IdentityScreen'
import { FinaleScreen } from './screens/FinaleScreen'
import { EndScreen } from './screens/EndScreen'

function Game() {
  const { state, isGameOver } = useGame()

  if (isGameOver) return <EndScreen outcome="defeat" />

  switch (state.currentScreen) {
    case 'intro':
      return <IntroScreen />
    case LevelId.Terminal:
      return <TerminalScreen />
    case LevelId.Intercept:
      return <InterceptScreen />
    case LevelId.FileSystem:
      return <FileSystemScreen />
    case LevelId.Binary:
      return <BinaryScreen />
    case LevelId.Firewall:
      return <FirewallScreen />
    case LevelId.Identity:
      return <IdentityScreen />
    case LevelId.Finale:
      return <FinaleScreen />
    case 'end':
      return <EndScreen outcome="victory" />
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
