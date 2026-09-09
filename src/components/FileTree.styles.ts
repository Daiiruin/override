import styled from 'styled-components'

export const Node = styled.details(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.sm,
  padding: `${theme.space['2']} ${theme.space['3']}`,
  marginBottom: theme.space['1'],
  color: theme.colors.text,

  summary: {
    cursor: 'pointer',
    color: theme.colors.accent,
  },

  p: {
    marginTop: theme.space['2'],
    color: theme.colors.textMuted,
  },
}))

export const Children = styled.div(({ theme }) => ({
  marginTop: theme.space['2'],
  paddingLeft: theme.space['4'],
}))
