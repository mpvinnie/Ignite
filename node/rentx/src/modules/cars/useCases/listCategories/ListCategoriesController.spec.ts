import { hash } from 'bcrypt'
import request from 'supertest'
import { Connection } from 'typeorm'
import { v4 as uuid } from 'uuid'

import { app } from '@shared/infra/http/app'
import createConnection from '@shared/infra/typeorm'

let connection: Connection

describe('List Categories Controller ', () => {
  beforeAll(async () => {
    connection = await createConnection()
    await connection.runMigrations()

    const id = uuid()
    const password = await hash('admin', 8)

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, "isAdmin", created_at)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', 'xxxxxx', true, 'now()')`
    )
  })

  afterAll(async () => {
    await connection.dropDatabase()
    await connection.close()
  })

  it('should be able list all categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin'
    })

    const { token } = responseToken.body

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest'
      })
      .set({
        Authorization: `Bearer ${token}`
      })

    const response = await request(app)
      .get('/categories')
      .set({
        Authorization: `Bearer ${token}`
      })

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(1)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0].name).toEqual('Category Supertest')
  })
})
