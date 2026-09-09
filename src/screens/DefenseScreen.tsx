import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useGame } from '../game/GameContext'
import {
  getLevel,
  DEFENSE_WORDS,
  DEFENSE_WORDS_TO_CLEAR,
  DEFENSE_CLEARED_SIGNAL,
} from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell, Divider } from '../components/ScreenShell'
import { Button } from '../design-system/atoms/Button'
import { Input } from '../design-system/atoms/Input'
import { Field, FallingWord, Progress, Form } from './DefenseScreen.styles'

const TICK_MS = 60
const FALL_DURATION_MS = 5000
const FALL_STEP = 100 / (FALL_DURATION_MS / TICK_MS)
const SPAWN_EVERY_TICKS = Math.round(1400 / TICK_MS)

interface FallingWordState {
  id: number
  text: string
  y: number
  x: number
}

let nextWordId = 0

export function DefenseScreen() {
  const { state, solveLevel, forceDefeat, penalize } = useGame()
  const level = getLevel(LevelId.Defense)
  const [ready, setReady] = useState(false)
  const [words, setWords] = useState<FallingWordState[]>([])
  const [cleared, setCleared] = useState(0)
  const [input, setInput] = useState('')
  const tickCount = useRef(0)

  useEffect(() => {
    if (!ready) return
    const interval = window.setInterval(() => {
      tickCount.current += 1
      setWords((current) => {
        const moved = current.map((word) => ({ ...word, y: word.y + FALL_STEP }))
        if (tickCount.current % SPAWN_EVERY_TICKS === 0) {
          const text = DEFENSE_WORDS[Math.floor(Math.random() * DEFENSE_WORDS.length)]
          moved.push({ id: nextWordId++, text, y: 0, x: Math.random() * 80 })
        }
        return moved
      })
    }, TICK_MS)
    return () => window.clearInterval(interval)
  }, [ready])

  useEffect(() => {
    if (words.some((word) => word.y >= 100)) {
      forceDefeat()
    }
  }, [words, forceDefeat])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const typed = input.trim().toUpperCase()
    setInput('')
    if (!typed) return

    const match = words.find((word) => word.text === typed)
    if (!match) {
      penalize()
      return
    }

    setWords((current) => current.filter((word) => word.id !== match.id))
    const total = cleared + 1
    setCleared(total)
    if (total >= DEFENSE_WORDS_TO_CLEAR) {
      solveLevel(DEFENSE_CLEARED_SIGNAL)
    }
  }

  return (
    <ScreenShell title={level.title}>
      <p>{level.narrative(state)}</p>
      <Divider />
      {!ready ? (
        <Button onClick={() => setReady(true)}>Prêt</Button>
      ) : (
        <>
          <Progress>
            {cleared} / {DEFENSE_WORDS_TO_CLEAR} commandes neutralisées
          </Progress>
          <Field>
            {words.map((word) => (
              <FallingWord key={word.id} style={{ top: `${word.y}%`, left: `${word.x}%` }}>
                {word.text}
              </FallingWord>
            ))}
          </Field>
          <Form onSubmit={handleSubmit}>
            <Input
              value={input}
              placeholder="Tape la commande affichée"
              onChange={(event) => setInput(event.target.value)}
              autoFocus
            />
            <Button type="submit">Valider</Button>
          </Form>
        </>
      )}
    </ScreenShell>
  )
}
