import styled, { css } from 'styled-components/native'
import { Platform, TextInput } from 'react-native'

export const Container = styled.View`
  background-color: ${props => props.theme.colors.input_background};
  border-radius: 5px;
  margin: -25px 40px 0;
  height: 50px;
  flex-direction: row;
  align-items: center;

  ${Platform.OS === 'ios' && css`
    shadow-color: #000;
    shadow-offset: {
        width: 0;
        height: 2;
    };
    shadow-opacity: 0.25;
    shadow-radius: 3.84;
  `}

  ${props => props.theme.title === 'light' && Platform.OS === 'android' && css`
    elevation: 5;
  `}
`

export const Input = styled(TextInput).attrs(props => ({
  placeholderTextColor: props.theme.colors.gray,
  color: props.theme.colors.text
}))`
  flex: 1;
  background: ${props => props.theme.colors.input_background};
  padding-left: 12px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`

export const AddButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.secondary};
  height: 50px;
  padding: 0 16px;
  justify-content: center;
  align-items: center;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`