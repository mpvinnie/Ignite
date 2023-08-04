import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getUserMetricsController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUserMetrics = makeGetUserMetricsUseCase()

  const { checkInsCount } = await getUserMetrics.execute({
    userId: request.user.sub,
  })

  return reply.status(200).send({ checkInsCount })
}
