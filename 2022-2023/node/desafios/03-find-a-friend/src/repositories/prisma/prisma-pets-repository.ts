import { CreatePetDTO, FindManyUnadoptedByCityDTO } from '@/dtos/pet-dtos'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: CreatePetDTO) {
    const pet = await prisma.pet.create({
      data: {
        org_id: data.org_id,
        name: data.name,
        about: data.about,
        age: data.age,
        size: data.size,
        energy_level: data.energy_level,
        independency_level: data.independency_level,
        environment: data.environment,
        images: {
          create: data.images.map(imageUrl => ({
            url: imageUrl
          }))
        },
        adoption_requirements: {
          create: data.adoption_requirements.map(requirement => ({
            description: requirement
          }))
        }
      }
    })

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
    const pets = await prisma.pet.findMany({
      where: {
        org: {
          address: {
            contains: city,
            mode: 'insensitive'
          }
        },
        age,
        size,
        energy_level,
        independency_level,
        environment,
        adopted_at: null
      }
    })

    return pets
  }
}
