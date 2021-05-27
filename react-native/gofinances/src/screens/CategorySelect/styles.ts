import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue as remv } from 'react-native-responsive-fontsize'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

interface CategoryProps {
  isActive: boolean
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${remv(15)}px;

  flex-direction: row;
  align-items: center;

  background: ${({ theme, isActive }) =>
    isActive
      ? theme.colors.secondary_light
      : theme.colors.background
  };
`

export const Icon = styled(Feather)`
  font-size: ${remv(20)}px;
  margin-right: 16px;
  color: ${({ theme }) => theme.colors.text}
`

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${remv(14)}px;
  color: ${({ theme }) => theme.colors.title}
`

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.colors.text};
`

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`