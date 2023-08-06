import { Image } from '@prisma/client'
import { ImagesRepository } from '../images-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryImagesRepository implements ImagesRepository {
  private static instance: InMemoryImagesRepository
  private images: Image[] = []

  private constructor() {}

  public static getInstance(): InMemoryImagesRepository {
    if (!InMemoryImagesRepository.instance) {
      InMemoryImagesRepository.instance = new InMemoryImagesRepository()
    }

    return InMemoryImagesRepository.instance
  }

  async add(petId: string, url: string) {
    const image: Image = {
      id: randomUUID(),
      pet_id: petId,
      url,
      created_at: new Date()
    }

    this.images.push(image)
  }

  async findByPetId(petId: string) {
    const images = this.images.filter(item => item.pet_id === petId)

    return images
  }
}
