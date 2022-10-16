import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string,

    colors: {
      primary: string
      secondary: string
      tertiary: string

      background: string

      title: string
      text: string

      gray: string

      input_background: string
      task_background: string
    }
    }
}
