import styled from 'styled-components/native'
import { RFValue as remv } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.shape};

  width: ${remv(300)}px;
  border-radius: 5px;
  padding: 18px 24px;
  padding-bottom: ${remv(42)}px;
  margin-right: 16px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${remv(14)}px;
  color: ${({ theme }) => theme.colors.title}
`

export const Icon = styled(Feather)`
  font-size: ${remv(40)}px;
  color: ${({ theme }) => theme.colors.success}
`

export const Footer = styled.View``

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${remv(32)}px;
  margin-top: 38px;
  color: ${({ theme }) => theme.colors.title}
`

export const LastTransaction = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${remv(12)}px;
  color: ${({ theme }) => theme.colors.text}
`