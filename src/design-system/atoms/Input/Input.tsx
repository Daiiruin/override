import type { InputHTMLAttributes } from 'react'
import { StyledInput } from './Input.styles'

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <StyledInput {...props} />
}
