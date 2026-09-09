import { useState, type FormEvent } from 'react'
import { useGame } from '../game/GameContext'
import { Button } from '../design-system/atoms/Button'
import { Input } from '../design-system/atoms/Input'
import { Form, Prompt, ErrorBar } from './LevelAnswerForm.styles'

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
    <>
      <Form onSubmit={handleSubmit}>
        <Prompt aria-hidden="true">&gt;</Prompt>
        <Input
          value={input}
          placeholder={placeholder}
          onChange={(event) => {
            setInput(event.target.value)
            setError(false)
          }}
          autoFocus
        />
        <Button type="submit">Valider</Button>
      </Form>
      {error && <ErrorBar role="alert">Code invalide.</ErrorBar>}
    </>
  )
}
