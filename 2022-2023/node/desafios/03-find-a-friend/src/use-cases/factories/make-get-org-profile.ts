import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetOrgProfile } from '../get-org-profile'

export function makeGetOrgProfile() {
  const orgsRepository = new PrismaOrgsRepository()
  const getOrgProfile = new GetOrgProfile(orgsRepository)

  return getOrgProfile
}
