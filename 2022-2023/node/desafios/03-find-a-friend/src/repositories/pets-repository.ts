import { CreatePetDTO, FindManyUnadoptedByCityDTO } from '@/dtos/pet-dtos'
import { Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: CreatePetDTO): Promise<Pet>
  findManyUnadoptedByCity(filter: FindManyUnadoptedByCityDTO): Promise<Pet[]>
}
