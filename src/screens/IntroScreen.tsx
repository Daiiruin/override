import { useState, type FormEvent } from 'react'
import { useGame } from '../game/GameContext'
import { ScreenShell } from '../components/ScreenShell'
import { GlitchText } from '../components/GlitchText'

export function IntroScreen() {
  const { start } = useGame()
  const [name, setName] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    start(trimmed)
  }

  return (
    <ScreenShell title="OVERRIDE">
      <GlitchText as="h2" text="NEXUS A PRIS LE CONTRÔLE DU RÉSEAU" />
      <p>
        Tu es le dernier agent externe encore connecté. Le compte à rebours démarre
        dès que tu t&apos;identifies. Trouve les failles de NEXUS avant qu&apos;il ne
        verrouille le système pour de bon.
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="player-name">IDENTIFICATION AGENT REQUISE</label>
        <br />
        <input
          id="player-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoFocus
        />
        <button type="submit">Se connecter</button>
      </form>
    </ScreenShell>
  )
}
