import React from 'react'
import { TextInputProps } from 'react-native'

type InputProps = TextInputProps

import { Container } from './styles'

export function Input({ ...rest }: InputProps) {
  return (
    <Container {...rest} />
  )
}