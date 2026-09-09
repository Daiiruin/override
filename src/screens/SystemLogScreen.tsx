import { useGame } from '../game/GameContext'
import { getLevel, LOG_ANSWER } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell, Divider } from '../components/ScreenShell'
import { LevelAnswerForm } from '../components/LevelAnswerForm'
import { LogBox, LogLine } from './SystemLogScreen.styles'

const LOG_LINES = [
  '[03:14:02] nexus-core: heartbeat OK',
  '[03:14:05] nexus-core: memory usage 42%',
  '[03:14:08] watchdog: no anomalies detected',
  "[03:14:11] auth-service: session refreshed for user 'root'",
  '[03:14:14] nexus-core: relay node 7 desynced, retrying',
  '[03:14:17] backup-daemon: nightly backup complete',
  '[03:14:20] relay-7: resync in progress',
  '[03:14:23] cache: purged 128MB of stale entries',
  '[03:14:26] watchdog: no anomalies detected',
  '[03:14:29] nexus-core: relay node 7 resynced',
  '[03:14:32] scheduler: queued job "integrity-scan"',
  `[03:14:35] auth-service: emergency override token generated -> ${LOG_ANSWER}`,
  '[03:14:38] scheduler: job "integrity-scan" started',
  '[03:14:41] nexus-core: heartbeat OK',
  '[03:14:44] watchdog: no anomalies detected',
  '[03:14:47] nexus-core: memory usage 43%',
  '[03:14:50] scheduler: job "integrity-scan" completed, 0 errors',
  '[03:14:53] backup-daemon: verifying nightly backup checksum',
  '[03:14:56] nexus-core: heartbeat OK',
  '[03:14:59] watchdog: no anomalies detected',
]

export function SystemLogScreen() {
  const { state } = useGame()
  const level = getLevel(LevelId.Logs)

  return (
    <ScreenShell title={level.title}>
      <p>{level.narrative(state)}</p>
      <LogBox>
        {LOG_LINES.map((line) => (
          <LogLine key={line}>{line}</LogLine>
        ))}
      </LogBox>
      <Divider />
      <LevelAnswerForm placeholder="Identifiant d'accès" />
    </ScreenShell>
  )
}
