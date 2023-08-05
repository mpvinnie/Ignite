import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(orgsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({ message: 'Validation error.', issues: error.format()})
  }

  if (env.NODE_ENV !== 'prod') {
    console.log(error)
  } else {
    // Implement some log tool to production
  }

  return reply.status(500).send({ message: 'Internal server error.'})
})
