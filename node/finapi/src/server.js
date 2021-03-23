const express = require('express')
const { v4: uuid } = require('uuid')

const customers = []

const app = express()

app.use(express.json())

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

app.listen(3333, () => {
  console.log('🏦 Server started on port 3333!')
})