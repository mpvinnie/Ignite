import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function foodsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    console.log(`[${request.method}] ${request.url}`)
  })

  app.get(
    '/',
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies

      const transactions = await knex('foods')
        .where('session_id', sessionId)
        .select()

      return { transactions }
    },
  )

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (request) => {
    const getFoodParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getFoodParamsSchema.parse(request.params)

    const { sessionId } = request.cookies

    const food = await knex('foods')
      .where({
        session_id: sessionId,
        id,
      })
      .first()

    return { food }
  })

  app.post('/', async (request, reply) => {
    const createFoodBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string(),
      within_diet: z.boolean(),
    })

    const { name, description, date, within_diet } = createFoodBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      })
    }

    await knex('foods').insert({
      id: randomUUID(),
      session_id: sessionId,
      name,
      description,
      date: date.toString(),
      within_diet,
    })

    return reply.status(201).send()
  })
}
