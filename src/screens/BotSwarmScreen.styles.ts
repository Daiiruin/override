import styled from 'styled-components'

export const Field = styled.div(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '16rem',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.sm,
  background: theme.colors.surfaceAlt,
  overflow: 'hidden',
}))

export const PcMarker = styled.div(({ theme }) => ({
  position: 'absolute',
  bottom: theme.space['2'],
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.space['1'],
  color: theme.colors.accent,
  fontSize: theme.font.size.xs,
  letterSpacing: theme.font.letterSpacing.wide,
}))

export const BotButton = styled.button<{ $exploding: boolean }>(({ theme, $exploding }) => ({
  position: 'absolute',
  transform: 'translateX(-50%)',
  color: theme.colors.nexus,
  background: 'none',
  border: 'none',
  padding: 0,
  lineHeight: 0,
  opacity: 1,
  transition: 'opacity 1s linear',

  ...($exploding && {
    opacity: 0,
    color: theme.colors.accent,
    cursor: 'default',
  }),
}))

export const Progress = styled.p(({ theme }) => ({
  fontSize: theme.font.size.sm,
  color: theme.colors.textMuted,
}))
