import styled from 'styled-components'

export const LogBox = styled.div(({ theme }) => ({
  width: '100%',
  textAlign: 'left',
  maxHeight: '16rem',
  overflowY: 'auto',
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.sm,
  background: theme.colors.surfaceAlt,
  padding: theme.space['3'],
  fontSize: theme.font.size.sm,
  lineHeight: theme.font.lineHeight.relaxed,
}))

export const LogLine = styled.p(({ theme }) => ({
  // && beats ScreenShell's Content `p { text-align: center }` descendant rule
  // (0,1,1), which otherwise outranks this component's own class (0,1,0) and
  // would center these log lines instead of keeping them left-aligned.
  '&&': {
    textAlign: 'left',
  },
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: theme.colors.textMuted,
}))
