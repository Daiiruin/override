import styled from 'styled-components'

export const Wrapper = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space['2'],
}))

export const Label = styled.span(({ theme }) => ({
  fontSize: theme.font.size.xs,
  letterSpacing: theme.font.letterSpacing.wide,
  color: theme.colors.textMuted,
}))

export const Icons = styled.div(({ theme }) => ({
  display: 'flex',
  gap: theme.space['1'],
}))

export const Icon = styled.span<{ $active: boolean }>(({ theme, $active }) => ({
  color: $active ? theme.colors.nexus : theme.colors.textSubtle,
  display: 'inline-flex',
}))
