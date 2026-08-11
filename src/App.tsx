import { AnimatePresence } from 'motion/react'
import { GameProvider, useGame } from './game/GameContext'
import { LevelId, type ScreenId } from './game/types'
import { TimerBar } from './components/TimerBar'
import { IntroScreen } from './screens/IntroScreen/IntroScreen'
import { TerminalScreen } from './screens/TerminalScreen'
import { InterceptScreen } from './screens/InterceptScreen'
import { FileSystemScreen } from './screens/FileSystemScreen'
import { BinaryScreen } from './screens/BinaryScreen'
import { FirewallScreen } from './screens/FirewallScreen'
import { IdentityScreen } from './screens/IdentityScreen'
import { FinaleScreen } from './screens/FinaleScreen'
import { EndScreen } from './screens/EndScreen'

function renderScreen(currentScreen: ScreenId) {
  switch (currentScreen) {
    case 'intro':
      return <IntroScreen key="intro" />
    case LevelId.Terminal:
      return <TerminalScreen key={LevelId.Terminal} />
    case LevelId.Intercept:
      return <InterceptScreen key={LevelId.Intercept} />
    case LevelId.FileSystem:
      return <FileSystemScreen key={LevelId.FileSystem} />
    case LevelId.Binary:
      return <BinaryScreen key={LevelId.Binary} />
    case LevelId.Firewall:
      return <FirewallScreen key={LevelId.Firewall} />
    case LevelId.Identity:
      return <IdentityScreen key={LevelId.Identity} />
    case LevelId.Finale:
      return <FinaleScreen key={LevelId.Finale} />
    case 'end':
      return <EndScreen key="end" outcome="victory" />
    default:
      return null
  }
}

function Game() {
  const { state, isGameOver } = useGame()

  return (
    <AnimatePresence mode="wait">
      {isGameOver ? (
        <EndScreen key="defeat" outcome="defeat" />
      ) : (
        renderScreen(state.currentScreen)
      )}
    </AnimatePresence>
  )
}

export function App() {
  return (
    <GameProvider>
      <TimerBar />
      <Game />
    </GameProvider>
  )
}
