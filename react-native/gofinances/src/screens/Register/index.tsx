import React, { useState } from 'react'

import { Button } from '../../components/Form/Button'
import { CategorySelect } from '../../components/Form/CategorySelect'
import { Input } from '../../components/Form/Input'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes
} from './styles'

export function Register() {
  const [transactionType, setTransactionType] = useState('')

  function handleTransactionTypesSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              isActive={transactionType === 'up'}
              onPress={() => handleTransactionTypesSelect('up')}
            />

            <TransactionTypeButton
              type="down"
              title="Outcome"
              isActive={transactionType === 'down'}
              onPress={() => handleTransactionTypesSelect('down')}
            />
          </TransactionTypes>

          <CategorySelect title="Categorias" />
        </Fields>

        <Button title="Enviar" />
      </Form>
    </Container>
  )
}