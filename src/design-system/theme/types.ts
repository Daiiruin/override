import 'styled-components'
import type { tokens } from './tokens'

type AppTheme = typeof tokens

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}
