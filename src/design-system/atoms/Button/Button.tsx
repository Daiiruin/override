import type { ButtonHTMLAttributes } from 'react'
import { StyledButton } from './Button.styles'

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <StyledButton type="button" {...props} />
}
