import { makeFetchPets } from '@/use-cases/factories/make-fetch-pets'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    city: z.string(),
    age: z.enum(['PUPPY', 'YOUNG_ADULT', 'MATURE_ADULT', 'SENIOR']).optional(),
    size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'GIANT']).optional(),
    energy_level: z.enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH']).optional(),
    independency_level: z
      .enum(['LOW', 'MODERATE', 'HIGH', 'VERY_HIGH'])
      .optional(),
    environment: z
      .enum([
        'SPACIOUS',
        'COMPACT',
        'OPEN',
        'LIMITED_SPACE',
        'EXPANSIVE',
        'CRAMPED'
      ])
      .optional()
  })

  const { city, age, size, energy_level, independency_level, environment } =
    searchQuerySchema.parse(request.query)

  const fetchPets = makeFetchPets()

  const { pets } = await fetchPets.execute({
    city,
    age,
    size,
    energy_level,
    independency_level,
    environment
  })

  return reply.status(200).send({
    pets
  })
}
