import { useEffect, useState } from 'react'
import { Lock, Key, Shield, Fingerprint } from 'lucide-react'
import { useGame } from '../game/GameContext'
import {
  getLevel,
  KEYPAD_NODE_COUNT,
  KEYPAD_SEQUENCE_LENGTH,
  KEYPAD_CLEARED_SIGNAL,
} from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell, Divider } from '../components/ScreenShell'
import { Button } from '../design-system/atoms/Button'
import { Status, Grid, Node } from './KeypadScreen.styles'

const NODE_ICONS = [Lock, Key, Shield, Fingerprint]

const LIT_MS = 500
const STEP_MS = 900

function generateSequence(): number[] {
  return Array.from({ length: KEYPAD_SEQUENCE_LENGTH }, () =>
    Math.floor(Math.random() * KEYPAD_NODE_COUNT),
  )
}

export function KeypadScreen() {
  const { state, solveLevel, penalize } = useGame()
  const level = getLevel(LevelId.Keypad)
  const [sequence] = useState<number[]>(() => generateSequence())
  const [ready, setReady] = useState(false)
  const [replayCount, setReplayCount] = useState(0)
  const [phase, setPhase] = useState<'playback' | 'input'>('playback')
  const [activeNode, setActiveNode] = useState<number | null>(null)
  const [playerProgress, setPlayerProgress] = useState(0)
  const [hasErrored, setHasErrored] = useState(false)

  useEffect(() => {
    if (!ready) return
    let cancelled = false
    const timeouts: number[] = []

    sequence.forEach((node, index) => {
      timeouts.push(
        window.setTimeout(() => {
          if (cancelled) return
          setActiveNode(node)
          timeouts.push(
            window.setTimeout(() => {
              if (!cancelled) setActiveNode(null)
            }, LIT_MS),
          )
        }, index * STEP_MS),
      )
    })

    timeouts.push(
      window.setTimeout(() => {
        if (!cancelled) setPhase('input')
      }, sequence.length * STEP_MS),
    )

    return () => {
      cancelled = true
      timeouts.forEach((id) => window.clearTimeout(id))
    }
  }, [ready, sequence, replayCount])

  function handleNodeClick(node: number) {
    if (phase !== 'input') return

    if (node !== sequence[playerProgress]) {
      setHasErrored(true)
      setPlayerProgress(0)
      setPhase('playback')
      setReplayCount((count) => count + 1)
      penalize()
      return
    }

    const nextProgress = playerProgress + 1
    if (nextProgress >= sequence.length) {
      solveLevel(KEYPAD_CLEARED_SIGNAL)
      return
    }
    setPlayerProgress(nextProgress)
  }

  return (
    <ScreenShell title={level.title}>
      <p>{level.narrative(state)}</p>
      <Divider />
      {!ready ? (
        <Button onClick={() => setReady(true)}>Prêt</Button>
      ) : (
        <>
          {phase === 'playback' ? (
            <Status>Observe la séquence...</Status>
          ) : (
            <Status>
              Reproduis la séquence ({playerProgress}/{sequence.length})
            </Status>
          )}
          {hasErrored && <Status>Erreur détectée, séquence relancée.</Status>}
          <Grid>
            {NODE_ICONS.map((Icon, node) => (
              <Node
                key={node}
                type="button"
                $active={activeNode === node}
                onClick={() => handleNodeClick(node)}
                disabled={phase === 'playback'}
                aria-label={`Symbole ${node + 1}`}
              >
                <Icon size={24} />
              </Node>
            ))}
          </Grid>
        </>
      )}
    </ScreenShell>
  )
}
