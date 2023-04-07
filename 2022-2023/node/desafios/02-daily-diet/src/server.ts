import cookie from '@fastify/cookie'
import fastify from 'fastify'
import { env } from './env'
import { foodsRoutes } from './routes/foods'

const app = fastify()

app.register(cookie)

app.register(foodsRoutes, {
  prefix: 'foods',
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('Http Server running on port 3333')
  })
