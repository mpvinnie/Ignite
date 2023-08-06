import { Age, Energy, Environment, Independency, Size } from '@/dtos/pet-dtos'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FetchPetsRequest {
  city: string
  age?: Age
  size?: Size
  energy_level?: Energy
  independency_level?: Independency
  environment?: Environment
}

interface FetchPetsResponse {
  pets: Pet[]
}

export class FetchPets {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energy_level,
    independency_level,
    environment
  }: FetchPetsRequest): Promise<FetchPetsResponse> {
    const pets = await this.petsRepository.findManyUnadoptedByCity({
      city,
      age,
      size,
      energy_level,
      independency_level,
      environment
    })

    return {
      pets
    }
  }
}
