import React, { useContext } from 'react';
import { Switch } from 'react-native'
import { ThemeContext } from 'styled-components';

import { Container, Logo, LogoText } from './styles'

interface HeaderProps {
  toggleTheme: () => void
}

export function Header({ toggleTheme }: HeaderProps) {
  const { colors, title } = useContext(ThemeContext)

  return (
    <Container>

      <Logo>
        <LogoText>to.</LogoText>
        <LogoText style={{fontFamily: 'Poppins-SemiBold'}}>do</LogoText>
      </Logo>

      <Switch
        onValueChange={toggleTheme}
        value={title === 'dark'}
        trackColor={{
          false: '#27277d',
          true: colors.secondary
        }}
        thumbColor={title === 'dark' ? '#4145bf' : colors.gray}
      />
    </Container>
  )
}