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

  app.put('/:id', async (request, reply) => {
    const editFoodParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const editFoodBodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      date: z.string().optional(),
      within_diet: z.boolean().optional(),
    })

    const { id } = editFoodParamsSchema.parse(request.params)
    const { name, description, date, within_diet } = editFoodBodySchema.parse(
      request.body,
    )

    const { sessionId } = request.cookies

    const food = await knex('foods')
      .where({
        id,
        session_id: sessionId,
      })
      .first()

    if (!food) {
      return reply.status(404).send({
        message: 'Food not found.',
      })
    }

    await knex('foods').update({
      name: name ?? food.name,
      description: description ?? food.description,
      date: date ?? food.date,
      within_diet: within_diet ?? food.within_diet,
    })

    return reply.send()
  })

  app.delete('/:id', async (request, reply) => {
    const deleteFoodParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = deleteFoodParamsSchema.parse(request.params)

    const { sessionId } = request.cookies

    const food = await knex('foods')
      .where({
        id,
        session_id: sessionId,
      })
      .first()

    if (!food) {
      return reply.status(404).send({
        message: 'Food not found.',
      })
    }

    await knex('foods').delete(id)

    return reply.status(200).send()
  })

  app.get('/metrics', async (request) => {
    const { sessionId } = request.cookies

    const foodsWithinDiet = await knex('foods')
      .where({
        session_id: sessionId,
        within_diet: true,
      })
      .count('*', { as: 'amount' })
      .first()

    const foodsOffDiet = await knex('foods')
      .where({
        session_id: sessionId,
        within_diet: false,
      })
      .count('*', { as: 'amount' })
      .first()

    return {
      metrics: {
        foodsWithinDiet,
        foodsOffDiet,
        foodsAmount:
          Number(foodsWithinDiet?.amount) + Number(foodsOffDiet?.amount),
      },
    }
  })
}
