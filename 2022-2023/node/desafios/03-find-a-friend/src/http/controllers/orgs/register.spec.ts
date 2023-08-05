import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('Register org (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/orgs').send({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      zip_code: '12345678',
      address: 'Endereço, Manaus - AM',
      whatsapp: '99999999999'
    })

    expect(response.statusCode).toEqual(201)
  })
})
