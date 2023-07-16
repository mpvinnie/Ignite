import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(appRoutes)
