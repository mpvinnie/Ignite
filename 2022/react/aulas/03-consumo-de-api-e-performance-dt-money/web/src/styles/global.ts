import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 2px ${props => props.theme['green-500']};
  }

  html {
    @media (max-width: 960px) {
      font-size: 87.5%;
    }

    @media (max-width: 640px) {
      font-size: 75%;
    }
  }

  body {
    background: ${props => props.theme['gray-800']};
    color: ${props => props.theme['gray-100']};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1rem Roboto, sans-serif;
  }

  button, input {
    border: 0;
  }

  button {
    cursor: pointer;
  }
`
