import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FetchPets } from '../fetch-pets'

export function makeFetchPets() {
  const petsRepository = new PrismaPetsRepository()
  const fetchPets = new FetchPets(petsRepository)

  return fetchPets
}
