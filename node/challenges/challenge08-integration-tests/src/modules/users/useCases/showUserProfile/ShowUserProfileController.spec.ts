import request from 'supertest'
import { Connection } from "typeorm"
import { app } from '../../../../app'

import createConnection from '../../../../database/'

let connection: Connection

describe('Show User Profile Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able to show the user profile', async () => {
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

    const response = await request(app).get('/api/v1/profile')
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')
  })
})
