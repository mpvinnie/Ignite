import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { search } from './search'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJwt] }, register)
  app.get('/pets', search)
}
