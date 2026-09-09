import styled from 'styled-components'

export const Wrapper = styled.div(({ theme }) => ({
  position: 'fixed',
  inset: 0,
  zIndex: theme.zIndex.toast,
  pointerEvents: 'none',
}))

export const Scanlines = styled.div({
  position: 'absolute',
  inset: 0,
  background:
    'repeating-linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 0px, rgba(0, 0, 0, 0.06) 1px, transparent 1px, transparent 3px)',
  mixBlendMode: 'overlay',
})

export const Vignette = styled.div(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  background: `radial-gradient(ellipse at center, transparent 60%, ${theme.colors.background} 140%)`,
  opacity: 0.7,
}))
