import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { searchGymsController } from './search-gyms-controller'
import { fetchNearbyGymsController } from './fetch-nearby-gyms-controller'
import { createGymController } from './create-gym-controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/gyms/search', searchGymsController)
  app.get('/gyms/nearby', fetchNearbyGymsController)

  app.get('/gyms', createGymController)
}
