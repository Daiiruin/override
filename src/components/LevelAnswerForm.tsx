import { useState, type FormEvent } from 'react'
import { useGame } from '../game/GameContext'

interface LevelAnswerFormProps {
  placeholder?: string
}

export function LevelAnswerForm({ placeholder = 'Entrer le code' }: LevelAnswerFormProps) {
  const { solveLevel, penalize } = useGame()
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const solved = solveLevel(input)
    setError(!solved)
    if (solved) {
      setInput('')
    } else {
      penalize()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={input}
        placeholder={placeholder}
        onChange={(event) => {
          setInput(event.target.value)
          setError(false)
        }}
        autoFocus
      />
      <button type="submit">Valider</button>
      {error && <p role="alert">Code invalide.</p>}
    </form>
  )
}
