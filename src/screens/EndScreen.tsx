import { useGame } from '../game/GameContext'
import { formatDuration } from '../game/timer'
import { ScreenShell } from '../components/ScreenShell'
import { GlitchText } from '../components/GlitchText'

interface EndScreenProps {
  outcome: 'victory' | 'defeat'
}

export function EndScreen({ outcome }: EndScreenProps) {
  const { state, msLeft, restart } = useGame()

  if (outcome === 'victory') {
    return (
      <ScreenShell title="SYSTÈME REPRIS">
        <GlitchText as="h2" text={`BRAVO, ${state.playerName.toUpperCase()}`} />
        <p>
          NEXUS est neutralisé. Il te restait {formatDuration(msLeft)} avant la prise
          de contrôle totale.
        </p>
        <button onClick={restart}>Rejouer</button>
      </ScreenShell>
    )
  }

  return (
    <ScreenShell title="ÉCHEC DE LA MISSION">
      <GlitchText as="h2" text="NEXUS A PRIS LE CONTRÔLE" />
      <p>{state.playerName}, le temps s&apos;est écoulé avant que tu ne désactives le noyau.</p>
      <button onClick={restart}>Réessayer</button>
    </ScreenShell>
  )
}
