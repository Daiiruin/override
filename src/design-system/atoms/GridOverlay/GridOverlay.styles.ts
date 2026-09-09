import styled from 'styled-components'
import { media } from '../../theme/tokens'

export const Wrapper = styled.div(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: theme.zIndex.behind,
  pointerEvents: 'none',
  display: 'none',

  [media.md]: {
    display: 'block',
  },
}))

export const Inner = styled.div(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: theme.layout.containerWidth,
  height: '100%',
  marginInline: 'auto',
}))

export const Line = styled.div(({ theme }) => ({
  position: 'absolute',
  top: 0,
  bottom: 0,
  width: '1px',
  background: theme.colors.grid,
}))
