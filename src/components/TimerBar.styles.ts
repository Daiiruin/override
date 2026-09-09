import styled, { css, keyframes } from 'styled-components'
import { media } from '../design-system/theme'

const pulse = keyframes({
  '0%, 100%': { opacity: 1 },
  '50%': { opacity: 0.4 },
})

// Tagged-template form (not object styles): this bar's critical state references the
// `pulse` keyframes animation, and object-style's `animation` typing only accepts a
// plain string — interpolating a Keyframes object into one never injects its
// @keyframes rule. See the plan's Global Constraints for the full explanation.
export const Bar = styled.div<{ $critical: boolean; $penalty: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space['4']};
  padding: ${({ theme }) => `${theme.space['2']} ${theme.space['4']}`};
  background: rgba(8, 7, 15, 0.85);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  font-size: ${({ theme }) => theme.font.size.xs};
  letter-spacing: ${({ theme }) => theme.font.letterSpacing.wide};
  color: ${({ theme }) => theme.colors.accent};

  ${({ $penalty, theme }) =>
    $penalty &&
    css`
      background: ${theme.colors.errorSubtle};
      color: ${theme.colors.error};
    `}

  ${({ $critical, $penalty, theme }) =>
    $critical &&
    !$penalty &&
    css`
      color: ${theme.colors.error};
      animation: ${pulse} 1s infinite;
    `}
`

export const AgentSegment = styled.span(({ theme }) => ({
  color: theme.colors.textMuted,
}))

export const LevelSegment = styled.span(({ theme }) => ({
  display: 'none',
  color: theme.colors.textMuted,

  [media.sm]: {
    display: 'block',
  },
}))

export const Countdown = styled.span(({ theme }) => ({
  fontWeight: theme.font.weight.semibold,
  color: 'inherit',
}))
