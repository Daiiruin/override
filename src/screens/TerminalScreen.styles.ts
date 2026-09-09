import styled from 'styled-components'

// Matches Panel's background (theme.colors.surface), not the page background —
// this text sits inside ScreenShell's panel, so it must blend into that surface.
// The `&&` doubles this rule's specificity: ScreenShell's Content styles plain `p`
// descendants (0,1,1) for narrative text, which otherwise outranks a bare styled.p
// class selector (0,1,0) and would win the cascade, undoing the hidden-clue trick.
export const HiddenClue = styled.p(({ theme }) => ({
  '&&': {
    color: theme.colors.surface,
  },
  userSelect: 'text',
}))
