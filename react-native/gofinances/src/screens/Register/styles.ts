import styled from 'styled-components/native'
import { RFValue as remv } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  background: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${remv(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 18px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${remv(18)}px;
`

export const Form = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;
  justify-content: space-between;
`

export const Fields = styled.View``