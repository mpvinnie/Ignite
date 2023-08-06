import { Requirement } from '@prisma/client'

export interface AdoptionRequirementsRepository {
  add(petId: string, description: string): Promise<void>
  findByPetId(petId: string): Promise<Requirement[]>
}
