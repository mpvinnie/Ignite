import React, { useCallback, useEffect, useState } from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TransactionCard, TransactionData } from '../../components/TransactionCard'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  Username,
  LogoutButton,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList
} from './styles'
import { useFocusEffect } from '@react-navigation/core'

export interface DataListProps extends TransactionData {
  id: string
}

interface HighlightProps {
  amount: string
}

interface HighlightData {
  entries: HighlightProps
  expensives: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted: DataListProps[] = transactions
      .map((transaction: DataListProps) => {
        if(transaction.type === 'positive') {
          entriesTotal += Number(transaction.amount)
        } else {
          expensiveTotal += Number(transaction.amount)
        }

        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(transaction.date))

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          type: transaction.type,
          category: transaction.category,
          date
        }
    })

    const total = entriesTotal - expensiveTotal
    
    setTransactions(transactionsFormatted)
    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })
  }


  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{ uri: 'https://github.com/mpvinnie.png'}} />

            <User>
              <UserGreeting>Olá,</UserGreeting>
              <Username>Vinicius</Username>
            </User>
          </UserInfo>

          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard type="up" amount={highlightData.entries.amount} date="25 de maio" />
        <HighlightCard type="down" amount={highlightData.expensives.amount} date="20 de maio" />
        <HighlightCard type="total" amount={highlightData.total.amount} date="25 de maio" />
      </HighlightCards>
    
      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={transactions}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </Transactions>
    </Container>
  )
}