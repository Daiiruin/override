import styled from 'styled-components'

export const Form = styled.form(({ theme }) => ({
  width: '100%',
  display: 'flex',
  gap: theme.space['2'],
  alignItems: 'stretch',
}))

export const Prompt = styled.span(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.accent,
  fontWeight: theme.font.weight.bold,
}))

export const ErrorBar = styled.p(({ theme }) => ({
  width: '100%',
  padding: `${theme.space['2']} ${theme.space['3']}`,
  background: theme.colors.errorSubtle,
  color: theme.colors.error,
  borderLeft: `2px solid ${theme.colors.error}`,
  fontSize: theme.font.size.sm,
  textAlign: 'left',
}))
