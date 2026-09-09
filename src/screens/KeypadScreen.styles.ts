import styled from 'styled-components'

export const Status = styled.p(({ theme }) => ({
  fontSize: theme.font.size.sm,
  color: theme.colors.textMuted,
}))

export const Grid = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.space['4'],
  justifyContent: 'center',
}))

export const Node = styled.button<{ $active: boolean }>(({ theme, $active }) => ({
  width: '4rem',
  height: '4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: theme.radii.sm,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.surfaceAlt,
  color: theme.colors.text,
  transition: `background ${theme.transition.fast}, color ${theme.transition.fast}, border-color ${theme.transition.fast}`,

  '&:disabled': {
    cursor: 'default',
  },

  '&:hover:not(:disabled)': {
    borderColor: theme.colors.accent,
  },

  ...($active && {
    background: theme.colors.nexus,
    borderColor: theme.colors.nexus,
    color: theme.colors.background,
  }),
}))
