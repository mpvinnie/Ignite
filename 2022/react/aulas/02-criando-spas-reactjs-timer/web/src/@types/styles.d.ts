import 'styled-components'
import type {defaultTheme} from '../styles/themes/default'

type ThemeType = typeof defaultTheme

declare module 'styled-components' {
  export type DefaultTheme = Record<string, unknown> & ThemeType
}
