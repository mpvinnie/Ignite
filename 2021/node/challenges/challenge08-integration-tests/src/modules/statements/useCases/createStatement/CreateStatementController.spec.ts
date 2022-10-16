import request from 'supertest'
import { Connection } from "typeorm"
import { app } from '../../../../app'

import createConnection from '../../../../database/'

let connection: Connection

describe('Create Statement Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to create a deposit statement', async () => {
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

    const response = await request(app).post('/api/v1/statements/deposit')
      .send({
        amount: 150,
        description: 'Auxilio Emergencial'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(201)
  })

  it('should be able to create a withdraw statement', async () => {
    const tokenResponse = await request(app).post('/api/v1/sessions').send({
      email: 'johndoe@example.com',
      password: '123456'
    })

    const { token } = tokenResponse.body

    const response = await request(app).post('/api/v1/statements/withdraw')
      .send({
        amount: 50,
        description: 'Saque'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(201)
  })
})
