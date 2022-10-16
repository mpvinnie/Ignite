import request from 'supertest'
import { Connection } from "typeorm"
import { app } from '../../../../app'

import createConnection from '../../../../database/'

let connection: Connection

describe('Authenticate User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able authenticate user', async () => {
    await request(app).post('/api/v1/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const response = await request(app).post('/api/v1/sessions').send({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(response.body).toHaveProperty('user')
    expect(response.body).toHaveProperty('token')
  })

  it('should not be able authenticate a non-existent user', async () => {
    const response = await request(app).post('/api/v1/sessions').send({
      email: 'non-existent-user-email',
      password: '123456'
    })

    expect(response.status).toBe(401)
  })

  it('should not be able authenticate with a incorrect password', async () => {
    const response = await request(app).post('/api/v1/sessions').send({
      email: 'johndoe@example.com',
      password: 'incorrect-password'
    })

    expect(response.status).toBe(401)
  })
})
