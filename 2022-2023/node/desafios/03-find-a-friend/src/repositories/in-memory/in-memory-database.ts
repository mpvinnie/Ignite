import { Image, Pet, Requirement } from '@prisma/client'
import { Org } from '@prisma/client'

export class InMemoryDatabase {
  private static instance: InMemoryDatabase
  orgs: Org[] = []
  pets: Pet[] = []
  images: Image[] = []
  adoption_requirements: Requirement[] = []

  private constructor() {}

  public static getInstance(): InMemoryDatabase {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new InMemoryDatabase()
    }

    return InMemoryDatabase.instance
  }
}
