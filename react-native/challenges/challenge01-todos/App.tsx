import React from 'react';
import { usePersistedState } from './src/hooks/usePersistedState'
import { ThemeProvider, DefaultTheme } from 'styled-components/native'

import { light } from './src/styles/themes/light'
import { dark } from './src/styles/themes/dark'

import { StatusBar } from 'react-native';
import { Home } from './src/pages/Home';

export default function App() {
  const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light)

  const toggleTheme = async () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  return (
    <ThemeProvider theme={ theme }>
      <StatusBar 
        backgroundColor="transparent" 
        translucent
        barStyle="light-content" 
      />
      <Home toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}
