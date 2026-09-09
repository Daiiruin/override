import styled from 'styled-components'

export const Narrative = styled.p({
  maxWidth: '42rem',
})

export const Form = styled.form(({ theme }) => ({
  width: '100%',
  maxWidth: '28rem',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space['3'],
}))

export const Label = styled.label(({ theme }) => ({
  fontSize: theme.font.size.xs,
  letterSpacing: theme.font.letterSpacing.wide,
  color: theme.colors.textMuted,
}))

export const Row = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.space['2'],
}))
