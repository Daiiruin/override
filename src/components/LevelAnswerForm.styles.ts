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

// && beats ScreenShell's Content `p { color: ...; text-align: center }` descendant
// rule (0,1,1), which otherwise outranks this component's own class (0,1,0).
export const ErrorBar = styled.p(({ theme }) => ({
  '&&': {
    color: theme.colors.error,
    textAlign: 'left',
  },
  width: '100%',
  padding: `${theme.space['2']} ${theme.space['3']}`,
  background: theme.colors.errorSubtle,
  borderLeft: `2px solid ${theme.colors.error}`,
  fontSize: theme.font.size.sm,
}))
