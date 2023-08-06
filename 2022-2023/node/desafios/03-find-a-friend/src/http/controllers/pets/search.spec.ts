import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'

describe('Search pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by city', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
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

    await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Roberta',
        about: 'Sobre a Roberta',
        age: 'YOUNG_ADULT',
        size: 'SMALL',
        energy_level: 'MODERATE',
        independency_level: 'MODERATE',
        environment: 'SPACIOUS',
        images: ['link-image1.png', 'link-image2.png'],
        adoption_requirements: ['requisito 1', 'requisito 2']
      })

    const response = await request(app.server).get('/pets').query({
      city: 'Manaus',
      size: 'SMALL'
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
    expect(response.body.pets).toEqual([
      expect.objectContaining({
        name: 'Roberta'
      })
    ])
  })
})
