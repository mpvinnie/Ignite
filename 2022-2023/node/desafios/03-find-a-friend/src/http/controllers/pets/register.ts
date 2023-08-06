import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { makeRegisterPet } from '@/use-cases/factories/make-register-pet'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerPetBodySchema = z.object({
    name: z.string(),
    about: z.string(),
    age: z.enum(['PUPPY', 'YOUNG_ADULT', 'MATURE_ADULT', 'SENIOR']),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'GIANT']),
    energy_level: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']),
    independency_level: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']),
    environment: z.enum([
      'SPACIOUS',
      'COMPACT',
      'OPEN',
      'LIMITED_SPACE',
      'EXPANSIVE',
      'CRAMPED'
    ]),
    images: z.array(z.string()),
    adoption_requirements: z.array(z.string())
  })

  const {
    name,
    about,
    age,
    size,
    energy_level,
    independency_level,
    environment,
    images,
    adoption_requirements
  } = registerPetBodySchema.parse(request.body)

  try {
    const registerPet = makeRegisterPet()

    await registerPet.execute({
      orgId: request.user.sub,
      name,
      about,
      age,
      size,
      energy_level,
      independency_level,
      environment,
      images,
      adoption_requirements
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      await reply.status(404).send({ message: err.message })
    }
  }

  await reply.status(201).send()
}
