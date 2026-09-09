import 'styled-components'
import type { tokens } from './tokens'

type AppTheme = typeof tokens

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- declaration merging idiom
  export interface DefaultTheme extends AppTheme {}
}
