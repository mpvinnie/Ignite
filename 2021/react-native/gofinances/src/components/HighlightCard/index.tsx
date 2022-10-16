import React from 'react'
interface Props {
  type: 'up' | 'down' | "total"
  amount: string
  date: string
}

const cardProps = {
  title: {
    up: 'Entrada',
    down: 'Saída',
    total: 'Total'
  },
  icon: {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
  },
  lastTransaction: {
    up: 'Última entrada dia',
    down: 'Última saída dia',
    total: '01 à'
  }
}

import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction
} from './styles'

export function HighlightCard({ type, amount, date }: Props) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type} >{cardProps.title[type]}</Title>
        <Icon name={cardProps.icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>
          {cardProps.lastTransaction[type]} {date}
        </LastTransaction>
      </Footer>
    </Container>
  )
}