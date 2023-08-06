import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeGetOrgProfile } from '@/use-cases/factories/make-get-org-profile'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const profileParamsSchema = z.object({
    orgId: z.string().uuid()
  })

  const { orgId } = profileParamsSchema.parse(request.params)

  try {
    const getOrgProfile = makeGetOrgProfile()

    const { org } = await getOrgProfile.execute({
      orgId
    })

    return reply.status(200).send({
      org: {
        ...org,
        password_hash: undefined
      }
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
  }
}
