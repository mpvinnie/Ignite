import { Image } from '@prisma/client'

export interface ImagesRepository {
  add(petId: string, url: string): Promise<void>
  findByPetId(petId: string): Promise<Image[]>
}
