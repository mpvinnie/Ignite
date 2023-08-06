import { CreatePetDTO } from '@/dtos/pet-dtos'
import { Pet } from '@prisma/client'

export interface PetsRepository {
  create(data: CreatePetDTO): Promise<Pet>
}
