import { InMemoryDatabase } from '@/repositories/in-memory/in-memory-database'

export function cleanInMemoryDatabase(database: InMemoryDatabase) {
  database.orgs = []
  database.pets = []
  database.images = []
  database.adoption_requirements = []
}
