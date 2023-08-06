import { CreatePetDTO } from '@/dtos/pet-dtos'
import { PetsRepository } from '../pets-repository'
import { Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { InMemoryImagesRepository } from './in-memory-images-repository'
import { InMemoryAdoptionRequirementsRepository } from './in-memory-adoption-requirements-repository'

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = []

  constructor(
    private imagesRepository: InMemoryImagesRepository,
    private adoptionRequirements: InMemoryAdoptionRequirementsRepository
  ) {}

  async create(data: CreatePetDTO) {
    const pet: Pet = {
      org_id: data.org_id,
      id: randomUUID(),
      name: data.name,
      about: data.about,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independency_level: data.independency_level,
      environment: data.environment,
      adopted_at: null,
      created_at: new Date()
    }

    data.images.map(item => this.imagesRepository.add(pet.id, item))
    data.adoption_requirements.map(item =>
      this.adoptionRequirements.add(pet.id, item)
    )

    this.pets.push(pet)

    return pet
  }
}
