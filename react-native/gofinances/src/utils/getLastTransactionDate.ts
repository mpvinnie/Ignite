type Collection = {
  type: 'positive' | 'negative',
  date: string
}

export function getLastTransactionDate(collection: Collection[], type: 'positive' | 'negative') {
  const lastTransaction =
    new Date(
      Math.max.apply(Math, collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime()))
    )

  return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
}