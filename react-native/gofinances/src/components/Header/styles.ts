import styled from 'styled-components/native'
import { RFValue as remv } from 'react-native-responsive-fontsize'


export const Container = styled.View`
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