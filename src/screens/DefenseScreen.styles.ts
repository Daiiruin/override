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

export const FallingWord = styled.span(({ theme }) => ({
  position: 'absolute',
  color: theme.colors.nexus,
  fontSize: theme.font.size.md,
  whiteSpace: 'nowrap',
}))

export const Progress = styled.p(({ theme }) => ({
  fontSize: theme.font.size.sm,
  color: theme.colors.textMuted,
}))

// && beats ScreenShell's Content `p { color: textMuted }` descendant rule (0,1,1),
// which otherwise outranks this component's own class (0,1,0).
export const Countdown = styled.p(({ theme }) => ({
  '&&': {
    color: theme.colors.nexus,
  },
  fontSize: theme.font.size['3xl'],
  fontWeight: theme.font.weight.bold,
}))

export const Form = styled.form(({ theme }) => ({
  width: '100%',
  display: 'flex',
  gap: theme.space['2'],
}))
