import styled from 'styled-components/native'
import { RFValue as remv } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  width: 100%;
  height: ${remv(56)}px;
  background: ${({ theme }) => theme.colors.secondary};

  border-radius: 5px;
  align-items: center;
  justify-content: center;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${remv(14)}px;
  color: ${({ theme }) => theme.colors.shape};
`