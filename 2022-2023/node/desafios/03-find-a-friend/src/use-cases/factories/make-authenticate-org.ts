import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrg } from '../authenticate-org'

export function makeAuthenticateOrg() {
  const orgsRepository = new PrismaOrgsRepository()
  const authenticateOrg = new AuthenticateOrg(orgsRepository)

  return authenticateOrg
}
