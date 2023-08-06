import { Requirement } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { AdoptionRequirementsRepository } from '../adoption-requirements-repository'

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  private static instance: InMemoryAdoptionRequirementsRepository
  private adoption_requirements: Requirement[] = []

  private constructor() {}

  public static getInstance(): InMemoryAdoptionRequirementsRepository {
    if (!InMemoryAdoptionRequirementsRepository.instance) {
      InMemoryAdoptionRequirementsRepository.instance =
        new InMemoryAdoptionRequirementsRepository()
    }

    return InMemoryAdoptionRequirementsRepository.instance
  }

  async add(petId: string, description: string) {
    const adoption_requirement: Requirement = {
      id: randomUUID(),
      pet_id: petId,
      description,
      created_at: new Date()
    }

    this.adoption_requirements.push(adoption_requirement)
  }

  async findByPetId(petId: string) {
    const images = this.adoption_requirements.filter(
      item => item.pet_id === petId
    )

    return images
  }
}
