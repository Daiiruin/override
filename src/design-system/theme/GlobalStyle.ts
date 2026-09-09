import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle(({ theme }) => ({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
  },

  // Toggled by CustomCursor once it confirms a fine pointer + no reduced-motion
  'body.custom-cursor-active, body.custom-cursor-active *': {
    cursor: 'none !important',
  },

  body: {
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    fontFamily: theme.font.family,
    fontSize: theme.font.size.base,
    lineHeight: theme.font.lineHeight.normal,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },

  a: {
    color: 'inherit',
    textDecoration: 'none',
  },

  'img, video': {
    maxWidth: '100%',
    display: 'block',
  },

  button: {
    cursor: 'pointer',
    border: 'none',
    background: 'none',
    font: 'inherit',
  },

  'ul, ol': {
    listStyle: 'none',
  },

  '::selection': {
    backgroundColor: theme.colors.accentSubtle,
    color: theme.colors.text,
  },

  ':focus-visible': {
    outline: `2px solid ${theme.colors.accent}`,
    outlineOffset: '3px',
    borderRadius: theme.radii.sm,
  },

  ':focus:not(:focus-visible)': {
    outline: 'none',
  },
}))
