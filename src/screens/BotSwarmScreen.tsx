import { useEffect, useRef, useState } from 'react'
import { Bot, Flame, Cpu } from 'lucide-react'
import { useGame } from '../game/GameContext'
import { getLevel, BOTS_TO_CLEAR, BOTS_CLEARED_SIGNAL } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell, Divider } from '../components/ScreenShell'
import { Button } from '../design-system/atoms/Button'
import { Field, PcMarker, BotButton, Progress } from './BotSwarmScreen.styles'

const TICK_MS = 60
const FALL_DURATION_MS = 4000
const FALL_STEP = 100 / (FALL_DURATION_MS / TICK_MS)
const SPAWN_EVERY_TICKS = Math.round(1200 / TICK_MS)
const EXPLOSION_MS = 1000

interface EnemyBot {
  id: number
  x: number
  y: number
  exploding: boolean
}

let nextBotId = 0

export function BotSwarmScreen() {
  const { state, solveLevel, forceDefeat } = useGame()
  const level = getLevel(LevelId.Finale)
  const [ready, setReady] = useState(false)
  const [bots, setBots] = useState<EnemyBot[]>([])
  const [cleared, setCleared] = useState(0)
  const tickCount = useRef(0)

  useEffect(() => {
    if (!ready) return
    const interval = window.setInterval(() => {
      tickCount.current += 1
      setBots((current) => {
        const moved = current.map((bot) =>
          bot.exploding ? bot : { ...bot, y: bot.y + FALL_STEP },
        )
        if (tickCount.current % SPAWN_EVERY_TICKS === 0) {
          moved.push({ id: nextBotId++, x: 5 + Math.random() * 85, y: 0, exploding: false })
        }
        return moved
      })
    }, TICK_MS)
    return () => window.clearInterval(interval)
  }, [ready])

  useEffect(() => {
    if (bots.some((bot) => !bot.exploding && bot.y >= 100)) {
      forceDefeat()
    }
  }, [bots, forceDefeat])

  function handleDestroy(id: number) {
    setBots((current) =>
      current.map((bot) => (bot.id === id ? { ...bot, exploding: true } : bot)),
    )

    const total = cleared + 1
    setCleared(total)
    if (total >= BOTS_TO_CLEAR) {
      solveLevel(BOTS_CLEARED_SIGNAL)
    }

    window.setTimeout(() => {
      setBots((current) => current.filter((bot) => bot.id !== id))
    }, EXPLOSION_MS)
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
            {cleared} / {BOTS_TO_CLEAR} bots détruits
          </Progress>
          <Field>
            <PcMarker>
              <Cpu size={22} />
              <span>VOTRE PC</span>
            </PcMarker>
            {bots.map((bot) => (
              <BotButton
                key={bot.id}
                type="button"
                $exploding={bot.exploding}
                style={{ top: `${bot.y}%`, left: `${bot.x}%` }}
                onClick={() => handleDestroy(bot.id)}
                disabled={bot.exploding}
                aria-label="Détruire le bot"
              >
                {bot.exploding ? <Flame size={26} /> : <Bot size={26} />}
              </BotButton>
            ))}
          </Field>
        </>
      )}
    </ScreenShell>
  )
}
