import { ThemeProvider } from 'styled-components'
import { GameProvider, useGame } from './game/GameContext'
import { LevelId, type ScreenId } from './game/types'
import { TimerBar } from './components/TimerBar'
import { IntroScreen } from './screens/IntroScreen/IntroScreen'
import { TerminalScreen } from './screens/TerminalScreen'
import { InterceptScreen } from './screens/InterceptScreen'
import { FileSystemScreen } from './screens/FileSystemScreen'
import { SystemLogScreen } from './screens/SystemLogScreen'
import { FirewallScreen } from './screens/FirewallScreen'
import { KeypadScreen } from './screens/KeypadScreen'
import { DefenseScreen } from './screens/DefenseScreen'
import { BotSwarmScreen } from './screens/BotSwarmScreen'
import { EndScreen } from './screens/EndScreen'
import { tokens, GlobalStyle } from './design-system/theme'
import { CRTOverlay } from './design-system/atoms/CRTOverlay'
import { GridOverlay } from './design-system/atoms/GridOverlay'
import { CustomCursor } from './design-system/atoms/CustomCursor'

function renderScreen(currentScreen: ScreenId) {
  switch (currentScreen) {
    case 'intro':
      return <IntroScreen />
    case LevelId.Terminal:
      return <TerminalScreen />
    case LevelId.Intercept:
      return <InterceptScreen />
    case LevelId.FileSystem:
      return <FileSystemScreen />
    case LevelId.Logs:
      return <SystemLogScreen />
    case LevelId.Firewall:
      return <FirewallScreen />
    case LevelId.Keypad:
      return <KeypadScreen />
    case LevelId.Defense:
      return <DefenseScreen />
    case LevelId.Finale:
      return <BotSwarmScreen />
    case 'end':
      return <EndScreen outcome="victory" />
    default:
      return null
  }
}

function Game() {
  const { state, isGameOver } = useGame()

  if (isGameOver) return <EndScreen outcome="defeat" />

  return renderScreen(state.currentScreen)
}

export function App() {
  return (
    <ThemeProvider theme={tokens}>
      <GlobalStyle />
      <GridOverlay />
      <CRTOverlay />
      <CustomCursor />
      <GameProvider>
        <TimerBar />
        <Game />
      </GameProvider>
    </ThemeProvider>
  )
}
