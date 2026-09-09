import { useState, type FormEvent } from 'react'
import { useGame } from '../../game/GameContext'
import { ScreenShell, Divider } from '../../components/ScreenShell'
import { GlitchText } from '../../components/GlitchText'
import { Button } from '../../design-system/atoms/Button'
import { Input } from '../../design-system/atoms/Input'
import { IntroDifficulty } from './IntroDifficulty'
import { Narrative, Form, Label, Row } from './IntroScreen.styles'

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
      <IntroDifficulty />
      <Narrative>
        Tu es le dernier agent externe encore connecté. Le compte à rebours démarre
        dès que tu t&apos;identifies. Trouve les failles de NEXUS avant qu&apos;il ne
        verrouille le système pour de bon.
      </Narrative>
      <Divider />
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="player-name">IDENTIFICATION AGENT REQUISE</Label>
        <Row>
          <Input
            id="player-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoFocus
          />
          <Button type="submit">Se connecter</Button>
        </Row>
      </Form>
    </ScreenShell>
  )
}
