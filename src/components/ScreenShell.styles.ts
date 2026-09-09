import styled, { keyframes } from 'styled-components'

export const Page = styled.div(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  // align-items defaults to 'stretch', which is what lets Panel below fill this
  // height instead of shrinking to its content — don't override it here.
  padding: `calc(${theme.space['12']} + 2rem) ${theme.space['4']} ${theme.space['8']}`,
}))

export const Panel = styled.div(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: theme.layout.containerWidth,
  display: 'flex',
  flexDirection: 'column',
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.sm,
}))

export const Corner = styled.span<{ $pos: 'tl' | 'tr' | 'bl' | 'br' }>(({ theme, $pos }) => {
  const base = {
    position: 'absolute' as const,
    width: '12px',
    height: '12px',
    pointerEvents: 'none' as const,
    border: `2px solid ${theme.colors.accent}`,
  }

  if ($pos === 'tl') {
    return { ...base, top: '-1px', left: '-1px', borderRight: 'none', borderBottom: 'none' }
  }
  if ($pos === 'tr') {
    return { ...base, top: '-1px', right: '-1px', borderLeft: 'none', borderBottom: 'none' }
  }
  if ($pos === 'bl') {
    return { ...base, bottom: '-1px', left: '-1px', borderRight: 'none', borderTop: 'none' }
  }
  return { ...base, bottom: '-1px', right: '-1px', borderLeft: 'none', borderTop: 'none' }
})

export const TitleBar = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `${theme.space['2']} ${theme.space['4']}`,
  borderBottom: `1px solid ${theme.colors.border}`,
  fontSize: theme.font.size.xs,
  letterSpacing: theme.font.letterSpacing.wide,
  color: theme.colors.textMuted,
}))

export const HostLabel = styled.span(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.space['2'],
}))

export const Logo = styled.img({
  width: '16px',
  height: '16px',
  display: 'block',
})

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.4 },
})

// Tagged-template form (not object styles): styled-components' object-style typing
// requires `animation` to be a plain string, but interpolating a Keyframes object into
// a plain string never registers/injects its @keyframes rule (silent no-op at best,
// a runtime error in dev). The tagged-template form is the only correct way to
// reference a keyframes animation, so it's a deliberate exception to object styles here.
export const LiveDot = styled.span`
  color: ${({ theme }) => theme.colors.success};
  animation: ${pulse} 2s ease-in-out infinite;
`

export const Body = styled.div(({ theme }) => ({
  flex: 1,
  padding: `${theme.space['8']} ${theme.space['6']}`,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space['4'],
}))

// A plain wrapper styling GlitchText's rendered child, not `styled(GlitchText)`:
// styled-components treats `as` as its own polymorphic prop even on a wrapped custom
// component, so `<styled(GlitchText) as="h1" .../>` renders a raw, empty `<h1>` instead
// of GlitchText's output. Targeting the child avoids that footgun entirely.
export const TitleWrap = styled.div(({ theme }) => ({
  textAlign: 'center',

  '& > *': {
    fontFamily: theme.font.display,
    textTransform: 'uppercase',
    fontSize: theme.font.size['3xl'],
    fontWeight: theme.font.weight.bold,
    letterSpacing: theme.font.letterSpacing.tight,
    color: theme.colors.text,
  },
}))

export const Content = styled.div(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.space['4'],

  p: {
    textAlign: 'center',
    maxWidth: '42rem',
    color: theme.colors.textMuted,
    lineHeight: theme.font.lineHeight.relaxed,
  },
}))

export const Divider = styled.hr(({ theme }) => ({
  width: '100%',
  border: 'none',
  borderTop: `1px solid ${theme.colors.border}`,
  margin: `${theme.space['2']} 0`,
}))
