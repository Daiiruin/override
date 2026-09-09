import styled from 'styled-components'

// Matches Panel's background (theme.colors.surface), not the page background —
// this text sits inside ScreenShell's panel, so it must blend into that surface.
export const HiddenClue = styled.p(({ theme }) => ({
  color: theme.colors.surface,
  userSelect: 'text',
}))
