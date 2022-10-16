import styled from 'styled-components/native'
import { TextInput } from 'react-native'
import { RFValue as remv } from 'react-native-responsive-fontsize'

export const Container = styled(TextInput)`
  width: 100%;
  height: ${remv(56)}px;
  padding: 0 16px;
  border-radius: 5px;
  margin-bottom: 8px;

  font-size: ${remv(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  background: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.title};
`