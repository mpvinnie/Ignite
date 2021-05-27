import React, { useState } from 'react'
import { Modal } from 'react-native'

import { Button } from '../../components/Form/Button'
import { CategorySelectButton } from '../../components/Form/CategorySelectButton'
import { Input } from '../../components/Form/Input'
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton'
import { Header } from '../../components/Header'
import { CategorySelect } from '../CategorySelect'

import {
  Container,
  Form,
  Fields,
  TransactionTypes
} from './styles'

export function Register() {
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  })

  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  function handleTransactionTypesSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  function handleCloseSelectCategoryModal() {
    setCategoryModalOpen(false)
  }

  return (
    <Container>
      <Header title="Cadastro" />

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

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button title="Enviar" />
      </Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </Container>
  )
}