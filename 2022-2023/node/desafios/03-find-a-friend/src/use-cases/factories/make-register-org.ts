import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrg } from '../register-org'

export function makeRegisterOrg() {
  const orgsRepository = new PrismaOrgsRepository()
  const registerOrg = new RegisterOrg(orgsRepository)

  return registerOrg
}
