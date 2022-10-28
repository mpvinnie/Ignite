import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue as remv } from 'react-native-responsive-fontsize'

interface TransactionProps {
  type: 'positive' | 'negative'
}

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
  padding: 18px 24px;
  margin-bottom: 16px;
`

export const Title = styled.Text`
  font-size: ${remv(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.title};
`

export const Amount = styled.Text<TransactionProps>`
  font-size: ${remv(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme, type }) =>
    type === 'positive'
    ? theme.colors.success
    : theme.colors.attention
  };
`

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
`

export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Icon = styled(Feather)`
  font-size: ${remv(20)}px;
  color: ${({ theme }) => theme.colors.text};
`

export const CategoryName = styled.Text`
  font-size: ${remv(14)}px;
  color: ${({ theme }) => theme.colors.text};

  margin-left: 18px;
`

export const Date = styled.Text`
  font-size: ${remv(14)}px;
  color: ${({ theme }) => theme.colors.text};
`