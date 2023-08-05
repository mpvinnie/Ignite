import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { checkInController } from './check-in-controller'
import { validateCheckInController } from './validate-check-in-controller'
import { fetchUserCheckInsHistoryController } from './fetch-user-check-ins-history-controller'
import { getUserMetricsController } from './get-user-metrics-controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.get('/check-ins/history', fetchUserCheckInsHistoryController)
  app.get('/check-ins/metrics', getUserMetricsController)

  app.post('/gyms/:gymId/check-ins', checkInController)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validateCheckInController,
  )
}
