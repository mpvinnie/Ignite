import { Age, Energy, Environment, Independency, Size } from '@/dtos/pet-dtos'
import { OrgsRepository } from '@/repositories/orgs-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { PetsRepository } from '@/repositories/pets-repository'

interface RegisterPetRequest {
  orgId: string
  name: string
  about: string
  age: Age
  size: Size
  energy_level: Energy
  independency_level: Independency
  environment: Environment
  images: string[]
  adoption_requirements: string[]
}

interface RegisterPetResponse {
  pet: Pet
}

export class RegisterPet {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository
  ) {}

  async execute({
    orgId,
    name,
    about,
    age,
    size,
    energy_level,
    independency_level,
    environment,
    images,
    adoption_requirements
  }: RegisterPetRequest): Promise<RegisterPetResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      org_id: orgId,
      name,
      about,
      age,
      size,
      energy_level,
      independency_level,
      environment,
      images,
      adoption_requirements
    })

    return {
      pet
    }
  }
}
