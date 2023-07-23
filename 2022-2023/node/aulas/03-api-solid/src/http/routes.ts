import { FastifyInstance } from 'fastify'
import { registerUserController } from './controllers/register-user-controller'
import { authenticateUserController } from './controllers/authenticate-user-controller'
import { userProfileController } from './controllers/user-profile-controller'
import { verifyJwt } from './middlewares/verify-jwt'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', registerUserController)

  app.post('/sessions', authenticateUserController)

  // Authenticated
  app.get('/me', { onRequest: [verifyJwt] }, userProfileController)
}
