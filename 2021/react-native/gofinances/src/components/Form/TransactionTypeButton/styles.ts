import styled, { css } from 'styled-components/native'
import { Feather } from '@expo/vector-icons'
import { RFValue as remv } from 'react-native-responsive-fontsize'
import { RectButton } from 'react-native-gesture-handler'

interface ContainerProps {
  isActive: boolean
  type: 'up' | 'down'
}

interface IconProps {
  type: 'up' | 'down'
}

export const Container = styled.View<ContainerProps>`
  width: 48%;
  height: ${remv(56)}px;

  border-width: ${({ isActive }) => isActive ? 0 : 1.5}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ isActive, type }) => isActive && type === 'up' && css`
    background: ${({ theme }) => theme.colors.success_light};
  `}

  ${({ isActive, type }) => isActive && type === 'down' && css`
    background: ${({ theme }) => theme.colors.attention_light};
  `}
`

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex: 1;
`

export const Icon = styled(Feather)<IconProps>`
  font-size: ${remv(24)}px;
  margin-right: 14px;

  color: ${({ theme, type }) =>
    type === 'up'
      ? theme.colors.success
      : theme.colors.attention
  }
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${remv(14)}px;
  color: ${({ theme }) => theme.colors.title};
`