import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { HighlightCard } from '../../components/HighlightCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TransactionCard, TransactionData } from '../../components/TransactionCard'
import { useTheme } from 'styled-components'

import {
  LoadContainer,
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
import { getLastTransactionDate } from '../../utils/getLastTransactionDate'

export interface DataListProps extends TransactionData {
  id: string
}

interface HighlightProps {
  amount: string
  lastTransaction: string
}

interface HighlightData {
  entries: HighlightProps
  expensives: HighlightProps
  total: HighlightProps
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [transactions, setTransactions] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData)

  const { colors } = useTheme()

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

    const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive')
    const lastTransactionsExpensives = getLastTransactionDate(transactions, 'negative')
    const totalInterval = new Date().toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long'
    })

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionsEntries
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: lastTransactionsExpensives
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false)
  }


  useEffect(() => {
    loadTransactions()
  }, [])

  useFocusEffect(useCallback(() => {
    loadTransactions()
  }, []))

  if (isLoading)
    return (
      <LoadContainer>
        <ActivityIndicator color={colors.primary} size="large" />
      </LoadContainer>
    )

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
        <HighlightCard
          type="up"
          amount={highlightData.entries.amount}
          date={highlightData.entries.lastTransaction}
        />

        <HighlightCard
          type="down"
          amount={highlightData.expensives.amount}
          date={highlightData.expensives.lastTransaction}

        />

        <HighlightCard
          type="total"
          amount={highlightData.total.amount}
          date={highlightData.total.lastTransaction}
        />
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