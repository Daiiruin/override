import styled from 'styled-components'
import type { CursorState } from './CustomCursor'

export const Trail = styled.div<{ $state: CursorState }>(({ theme, $state }) => {
  const base = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    translate: '-50% -50%',
    pointerEvents: 'none' as const,
    zIndex: theme.zIndex.toast + 1,
    transition:
      'width 150ms ease, height 150ms ease, background 150ms ease, border-color 150ms ease',
  }

  if ($state === 'link') {
    return {
      ...base,
      width: '32px',
      height: '32px',
      background: 'transparent',
      border: `1px solid ${theme.colors.accent}`,
    }
  }

  if ($state === 'text') {
    return {
      ...base,
      width: '2px',
      height: '20px',
      background: theme.colors.accent,
      border: 'none',
    }
  }

  return {
    ...base,
    width: '8px',
    height: '8px',
    background: theme.colors.accent,
    border: 'none',
  }
})

export const Dot = styled.div(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '4px',
  height: '4px',
  translate: '-50% -50%',
  pointerEvents: 'none',
  zIndex: theme.zIndex.toast,
  background: theme.colors.nexus,
}))
