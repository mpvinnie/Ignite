import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterOrg } from '@/use-cases/factories/make-register-org'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrgBodySchema = z.object({
    responsible_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    zip_code: z
      .string()
      .refine(value => value.length === 8 && /^\d+$/.test(value), {
        message: 'CEP must have 8 numeric digits'
      }),
    address: z.string(),
    whatsapp: z
      .string()
      .refine(value => value.length === 11 && /^\d+$/.test(value), {
        message: 'CEP must have 11 numeric digits'
      })
  })

  const { responsible_name, email, password, zip_code, address, whatsapp } =
    registerOrgBodySchema.parse(request.body)

  try {
    const registerOrg = makeRegisterOrg()

    await registerOrg.execute({
      responsible_name,
      email,
      password,
      zip_code,
      address,
      whatsapp
    })
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
  }

  return reply.status(201).send()
}
