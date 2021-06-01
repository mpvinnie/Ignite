import styled from 'styled-components/native'
import { FlatList } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler'
import { RFPercentage as remp, RFValue as remv} from 'react-native-responsive-fontsize'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { DataListProps } from '.'

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  height: ${remp(42)}px;

  background: ${({ theme }) => theme.colors.primary};
`

export const UserWrapper = styled.View`
  width: 100%;
  padding: 0 24px;
  margin-top: ${getStatusBarHeight() + remv(28)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Photo = styled.Image`
  width: ${remv(48)}px;
  height: ${remv(48)}px;

  border-radius: 10px;
`

export const User = styled.View`
  margin-left: 18px;
`

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${remv(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: ${remv(24)}px;
`

export const Username = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${remv(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  line-height: ${remv(24)}px;
`

export const LogoutButton = styled(BorderlessButton)``

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${remv(24)}px;
`

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingLeft: 24,
    paddingRight: 8
  }
})`
  width: 100%;
  position: absolute;
  margin-top: ${remp(20)}px;
`

export const Transactions = styled.View`
  flex: 1;
  padding: 0 24px;

  margin-top: ${remp(12)}px;
  margin-bottom: 8px;
`

export const Title = styled.Text`
  font-size: ${remv(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 16px;
`

export const TransactionsList = styled(FlatList as new () => FlatList<DataListProps>).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace()
  }
})``