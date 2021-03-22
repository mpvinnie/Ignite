const express = require('express')

const app = express()

app.get('/', (request, response) => {
  return response.json({
    user: {
      id: '12345678909',
      name: 'Vinicius Peres',
      email: 'vinniemalafaia@hotmail.com'
    }
  })
})

app.listen(3333)