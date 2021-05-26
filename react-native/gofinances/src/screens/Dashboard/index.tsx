import React from 'react'
import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard } from '../../components/TransactionCard'

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
  Title
} from './styles'

export function Dashboard() {
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

        <TransactionCard />
      </Transactions>
    </Container>
  )
}