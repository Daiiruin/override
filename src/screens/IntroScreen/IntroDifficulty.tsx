import { Skull } from 'lucide-react'
import './IntroDifficulty.css'

const DIFFICULTY_LEVEL = 1
const DIFFICULTY_MAX = 5

export function IntroDifficulty() {
  return (
    <div className="intro-difficulty">
      <span className="intro-difficulty__label">DIFFICULTÉ DE LA MISSION</span>
      <div className="intro-difficulty__icons">
        {Array.from({ length: DIFFICULTY_MAX }, (_, index) => (
          <Skull
            key={index}
            size={18}
            className={`intro-difficulty__icon${
              index < DIFFICULTY_LEVEL ? ' intro-difficulty__icon--active' : ''
            }`}
          />
        ))}
      </div>
    </div>
  )
}
