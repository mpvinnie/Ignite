import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue as remv } from 'react-native-responsive-fontsize'

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  background: ${({ theme }) => theme.colors.shape};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  height: ${remv(56)}px;
  padding: 0 16px;
  border-radius: 5px;
`

export const Category = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${remv(14)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const Icon = styled(Feather)`
  font-size: ${remv(20)}px;
  color: ${({ theme }) => theme.colors.text};
`