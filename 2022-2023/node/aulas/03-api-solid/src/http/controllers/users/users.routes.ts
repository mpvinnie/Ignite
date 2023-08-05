import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { authenticateUserController } from './authenticate-user-controller'
import { registerUserController } from './register-user-controller'
import { userProfileController } from './user-profile-controller'
import { refreshController } from './refresh-controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)
  app.post('/sessions', authenticateUserController)

  app.patch('/token/refresh', refreshController)

  // Authenticated
  app.get('/me', { onRequest: [verifyJwt] }, userProfileController)
}
