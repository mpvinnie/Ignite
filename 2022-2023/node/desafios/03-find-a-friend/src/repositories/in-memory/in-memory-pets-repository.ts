import { CreatePetDTO, FindManyUnadoptedByCityDTO } from '@/dtos/pet-dtos'
import { PetsRepository } from '../pets-repository'
import { Org, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { InMemoryDatabase } from './in-memory-database'

export class InMemoryPetsRepository implements PetsRepository {
  constructor(private database: InMemoryDatabase) {}

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

    data.images.map(item => {
      const image = {
        id: randomUUID(),
        url: item,
        pet_id: pet.id,
        created_at: new Date()
      }

      this.database.images.push(image)
    })

    data.adoption_requirements.map(item => {
      const adoption_requirement = {
        id: randomUUID(),
        description: item,
        pet_id: pet.id,
        created_at: new Date()
      }

      this.database.adoption_requirements.push(adoption_requirement)
    })

    this.database.pets.push(pet)

    return pet
  }

  async findManyUnadoptedByCity({
    city,
    age,
    size,
    energy_level,
    independency_level,
    environment
  }: FindManyUnadoptedByCityDTO) {
    const pets = this.database.pets.filter(pet => {
      if (pet.adopted_at !== null) {
        return false
      }

      const org = this.database.orgs.find(org => org.id === pet.org_id) as Org

      if (!org.address.toLowerCase().includes(city.toLowerCase())) {
        return false
      }

      if (age !== undefined && pet.age !== age) {
        return false
      }

      if (size !== undefined && pet.size !== size) {
        return false
      }

      if (energy_level !== undefined && pet.energy_level !== energy_level) {
        return false
      }

      if (
        independency_level !== undefined &&
        pet.independency_level !== independency_level
      ) {
        return false
      }

      if (environment !== undefined && pet.environment !== environment) {
        return false
      }

      return true
    })

    return pets
  }
}
