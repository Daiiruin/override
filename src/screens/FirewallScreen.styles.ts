import styled from 'styled-components'

export const Grid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 4rem)',
  gap: theme.space['3'],
  justifyContent: 'center',
}))

export const Node = styled.button<{ $active: boolean }>(({ theme, $active }) => ({
  aspectRatio: '1',
  fontFamily: theme.font.family,
  fontSize: theme.font.size.lg,
  borderRadius: theme.radii.sm,
  border: `1px solid ${theme.colors.border}`,
  background: theme.colors.surfaceAlt,
  color: theme.colors.text,
  transition: `background ${theme.transition.fast}, color ${theme.transition.fast}, border-color ${theme.transition.fast}`,

  ...($active && {
    background: theme.colors.nexus,
    borderColor: theme.colors.nexus,
    color: theme.colors.background,
  }),
}))

// && beats ScreenShell's Content `p { color: ... }` descendant rule (0,1,1),
// which otherwise outranks this component's own class (0,1,0).
export const ErrorBar = styled.p(({ theme }) => ({
  '&&': {
    color: theme.colors.error,
    textAlign: 'left',
  },
  padding: `${theme.space['2']} ${theme.space['3']}`,
  background: theme.colors.errorSubtle,
  borderLeft: `2px solid ${theme.colors.error}`,
  fontSize: theme.font.size.sm,
}))
