import styled from 'styled-components'

export const StyledInput = styled.input(({ theme }) => ({
  width: '100%',
  padding: `${theme.space['3']} ${theme.space['4']}`,
  background: theme.colors.surface,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.radii.sm,
  color: theme.colors.text,
  fontFamily: theme.font.family,
  fontSize: theme.font.size.base,
  caretColor: theme.colors.accent,
  outline: 'none',
  transition: `border-color ${theme.transition.fast}`,

  '&::placeholder': {
    color: theme.colors.textSubtle,
  },

  '&:focus': {
    borderColor: theme.colors.accent,
  },
}))
