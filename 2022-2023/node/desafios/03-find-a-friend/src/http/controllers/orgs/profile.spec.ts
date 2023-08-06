import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Org profile (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the org profile', async () => {
    await request(app.server).post('/orgs').send({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      zip_code: '12345678',
      address: 'Endereço, Manaus - AM',
      whatsapp: '99999999999'
    })

    const org = await prisma.org.findFirstOrThrow()

    const response = await request(app.server).get(`/orgs/${org.id}`).send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.org.id).toEqual(org.id)
  })
})
