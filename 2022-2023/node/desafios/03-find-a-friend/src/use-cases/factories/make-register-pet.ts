import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPet } from '../register-pet'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeRegisterPet() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const registerPet = new RegisterPet(orgsRepository, petsRepository)

  return registerPet
}
