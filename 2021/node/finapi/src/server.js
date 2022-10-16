const express = require('express')
const { v4: uuid } = require('uuid')

const customers = []

const app = express()

app.use(express.json())

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers

  const customer = customers.find(customer => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({error: 'Customer not found'})
  }

  request.customer = customer

  return next()
}

function getBalance(statement) {
  const balance = statement.reduce((acumulator, operation) => {
    if(operation.type === 'credit') {
      return acumulator + operation.amount
    } else {
      return acumulator - operation.ammount
    }
  }, 0)

  return balance
}

app.post('/accounts', (request, response) => {
  const { cpf, name } = request.body

  const customerAlreadyExists = customers.some(
    customer => customer.cpf === cpf
  )

  if (customerAlreadyExists) {
    return response.status(400).json({ error: 'Customer already exists!'})
  }

  const user = Object.assign({
    id: uuid(),
    cpf,
    name,
    statement: []
  })

  customers.push(user)

  return response.status(201).json(user)
})

app.get('/statements', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request

  return response.json(customer.statement)
})

app.post('/deposits', verifyIfExistsAccountCPF, (request, response ) => {
  const { description, amount } = request.body

  const { customer } = request

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body

  const { customer } = request

  const balance = getBalance(customer.statement)

  if (balance < amount) {
    return response.status(400).json({ error: 'Insufficient funds'})
  }

  const statementOperation = {
    amount,
    type: 'debit',
    created_at: new Date()
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()

})

app.get('/statements/date', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request
  const { date } = request.query

  const dateFormat = new Date(date + " 00:00")

  const statement = customer.statement.filter(statement => statement.created_at.toDateString() === new Date(dateFormat).toDateString())

  return response.json(statement)
})

app.put('/accounts', verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body
  const { customer } = request

  customer.name = name

  return response.status(201).send()
})

app.get('/accounts', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request

  return response.status(201).json(customer)
})

app.delete('/accounts', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request

  customers.splice(customer, 1)

  return response.status(200).json(customers)
})

app.get('/balance', verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request

  const balance = getBalance(customer.statement)

  return response.json(balance)
})

app.listen(3333, () => {
  console.log('🏦 Server started on port 3333!')
})