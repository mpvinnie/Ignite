import request from 'supertest'
import { Connection } from "typeorm"
import { app } from '../../../../app'

import createConnection from '../../../../database/'

let connection: Connection

describe('Get Balance Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to show a statement', async () => {
    await request(app).post('/api/v1/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const tokenResponse = await request(app).post('/api/v1/sessions').send({
      email: 'johndoe@example.com',
      password: '123456'
    })

    const { token } = tokenResponse.body

    await request(app).post('/api/v1/statements/deposit')
      .send({
        amount: 150,
        description: 'Auxilio Emergencial'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    const statementReturn = await request(app).post('/api/v1/statements/withdraw')
      .send({
        amount: 50,
        description: 'Saque'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    const { id } = statementReturn.body

    const response = await request(app).get(`/api/v1/statements/${id}`).set({
      Authorization: `Bearer ${token}`
    })

    expect(response.status).toBe(200)
  })
})
