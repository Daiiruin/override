import { useEffect, useRef, useState } from 'react'
import { Bot, Flame, Cpu } from 'lucide-react'
import { useGame } from '../game/GameContext'
import { getLevel, BOTS_TO_CLEAR, BOTS_CLEARED_SIGNAL } from '../game/levels'
import { LevelId } from '../game/types'
import { ScreenShell } from '../components/ScreenShell'
import { useCountdown } from '../hooks/useCountdown'
import './BotSwarmScreen.css'

const READY_SECONDS = 5
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
  const countdown = useCountdown(READY_SECONDS)
  const [bots, setBots] = useState<EnemyBot[]>([])
  const [cleared, setCleared] = useState(0)
  const tickCount = useRef(0)

  useEffect(() => {
    if (countdown > 0) return
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
  }, [countdown])

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
      {countdown > 0 ? (
        <p className="level-countdown">{countdown}</p>
      ) : (
        <>
          <p className="assault-progress">
            {cleared} / {BOTS_TO_CLEAR} bots détruits
          </p>
          <div className="assault-field">
            <div className="assault-field__pc">
              <Cpu size={22} />
              <span>VOTRE PC</span>
            </div>
            {bots.map((bot) => (
              <button
                key={bot.id}
                type="button"
                className={`assault-bot${bot.exploding ? ' assault-bot--exploding' : ''}`}
                style={{ top: `${bot.y}%`, left: `${bot.x}%` }}
                onClick={() => handleDestroy(bot.id)}
                disabled={bot.exploding}
                aria-label="Détruire le bot"
              >
                {bot.exploding ? <Flame size={26} /> : <Bot size={26} />}
              </button>
            ))}
          </div>
        </>
      )}
    </ScreenShell>
  )
}
