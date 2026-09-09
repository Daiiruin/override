import styled from 'styled-components'

export const StyledButton = styled.button(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space['2'],
  padding: `${theme.space['2']} ${theme.space['4']}`,
  fontFamily: theme.font.family,
  fontSize: theme.font.size.sm,
  fontWeight: theme.font.weight.semibold,
  letterSpacing: theme.font.letterSpacing.wide,
  textTransform: 'uppercase',
  color: theme.colors.accent,
  background: 'transparent',
  border: `1px solid ${theme.colors.accent}`,
  borderRadius: theme.radii.sm,
  transition: `background ${theme.transition.fast}, color ${theme.transition.fast}`,

  '&:hover:not(:disabled)': {
    background: theme.colors.accent,
    color: theme.colors.background,
  },

  '&:disabled': {
    opacity: 0.45,
    cursor: 'not-allowed',
  },
}))
