import { useState } from 'react'
import { useGame } from '../game/GameContext'
import { getLevel, FIREWALL_ANSWER } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell, Divider } from '../components/ScreenShell'
import { Grid, Node, ErrorBar } from './FirewallScreen.styles'

const NODES = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function FirewallScreen() {
  const { state, solveLevel, penalize } = useGame()
  const level = getLevel(LevelId.Firewall)
  const [sequence, setSequence] = useState<number[]>([])
  const [error, setError] = useState(false)

  function handleClick(node: number) {
    const next = [...sequence, node]
    const expected = FIREWALL_ANSWER.split('-').map(Number)
    const isValidSoFar = next.every((value, index) => value === expected[index])

    if (!isValidSoFar) {
      setSequence([])
      setError(true)
      penalize()
      return
    }

    setError(false)
    if (next.length === expected.length) {
      solveLevel(next.join('-'))
      setSequence([])
      return
    }
    setSequence(next)
  }

  return (
    <ScreenShell title={level.title}>
      <p>{level.narrative(state)}</p>
      <Divider />
      <Grid>
        {NODES.map((node) => (
          <Node key={node} $active={sequence.includes(node)} onClick={() => handleClick(node)}>
            {node}
          </Node>
        ))}
      </Grid>
      {error && <ErrorBar role="alert">Séquence incorrecte, recommence.</ErrorBar>}
    </ScreenShell>
  )
}
