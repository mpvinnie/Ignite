import styled from 'styled-components/native'
import { RFValue as remv } from 'react-native-responsive-fontsize'

export const Container = styled.View`
  width: 100%;
`

export const Error = styled.Text`
  color: ${({ theme }) => theme.colors.attention};
  font-size: ${remv(12)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 8px;
`