import styled from 'styled-components'

export const Grid = styled.div(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  gap: `${theme.space['2']} ${theme.space['1']}`,
  padding: theme.space['4'],
  background: theme.colors.surfaceAlt,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.sm,
  fontSize: theme.font.size.sm,
}))

export const Pair = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '1.6rem',
})

export const Received = styled.span(({ theme }) => ({
  color: theme.colors.nexus,
}))

export const Real = styled.span(({ theme }) => ({
  color: theme.colors.accent,
}))
