import styled from 'styled-components/native'
import { StatusBar } from 'react-native'

const statusBarHeight = StatusBar.currentHeight as number

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${statusBarHeight + 16}px 24px 44px;
  background: ${props => props.theme.colors.primary};
`

export const Logo = styled.View`
  flex-direction: row;
`

export const LogoText = styled.Text`
  font-size: 24px;
  color: #FFF;
  font-family: 'Poppins-Regular';
`