import React from 'react'
import { HighlightCard } from '../../components/HighlightCard'
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
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList
} from './styles'

export interface DataListProps extends TransactionData {
  id: string
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.000,00',
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: '20/05/2021'
    },
    {
      id: '2',
      type: 'negative',
      title: 'Pizza',
      amount: 'R$ 45,99',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '20/05/2021'
    },
    {
      id: '3',
      type: 'negative',
      title: 'Aluguel do apartamento',
      amount: 'R$ 1.200,00',
      category: {
        name: 'Casa',
        icon: 'home'
      },
      date: '20/05/2021'
    }
  ]

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

          <Icon name="power" />
        </UserWrapper>
      </Header>

      <HighlightCards>
        <HighlightCard type="up" amount="R$ 17.400,00" date="25 de maio" />
        <HighlightCard type="down" amount="R$ 1.259,00" date="20 de maio" />
        <HighlightCard type="total" amount="R$ 16.141,00" date="25 de maio" />
      </HighlightCards>
    
      <Transactions>
        <Title>Listagem</Title>

        <TransactionsList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

      </Transactions>
    </Container>
  )
}