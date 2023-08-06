import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Register pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Luluzinha',
        about: 'Sobre a Luluzinha',
        age: 'YOUNG_ADULT',
        size: 'MEDIUM',
        energy_level: 'MODERATE',
        independency_level: 'MODERATE',
        environment: 'SPACIOUS',
        images: ['link-image1.png', 'link-image2.png'],
        adoption_requirements: ['requisito 1', 'requisito 2']
      })

    expect(response.statusCode).toEqual(201)
  })
})
