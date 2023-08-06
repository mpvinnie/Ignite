import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { profile } from './profile'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.get('/orgs/:orgId', profile)

  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)
}
