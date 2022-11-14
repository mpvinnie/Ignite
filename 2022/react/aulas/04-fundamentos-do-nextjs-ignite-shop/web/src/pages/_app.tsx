import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/global'

import { AppContainer, Header } from '../styles/pages/app'

import logoImg from '../assets/logo.svg'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContainer>
      <Header>  
        <img src={logoImg.src} alt="" />
      </Header>
      <Component {...pageProps} />
    </AppContainer>
  )
}
