import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { ZodError } from 'zod'
import { env } from './env'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '10m'
  }
})

app.register(fastifyCookie)

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
