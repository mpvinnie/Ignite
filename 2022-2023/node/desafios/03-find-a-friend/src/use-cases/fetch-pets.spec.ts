import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryDatabase } from '@/repositories/in-memory/in-memory-database'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FetchPets } from './fetch-pets'
import { randomUUID } from 'node:crypto'
import { cleanInMemoryDatabase } from '@/utils/test/clean-in-memory-database'

let inMemoryDatabase: InMemoryDatabase
let petsRepository: InMemoryPetsRepository
let sut: FetchPets

describe('List pets by city and categories', () => {
  beforeEach(() => {
    inMemoryDatabase = InMemoryDatabase.getInstance()
    petsRepository = new InMemoryPetsRepository(inMemoryDatabase)
    sut = new FetchPets(petsRepository)
  })

  afterEach(() => {
    cleanInMemoryDatabase(inMemoryDatabase)
  })

  it('should be able to list the pets by city', async () => {
    const org01 = {
      id: randomUUID(),
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      zip_code: '12345678',
      address: 'Centro, Manaus - AM',
      whatsapp: '12345678901',
      created_at: new Date()
    }

    const org02 = {
      id: randomUUID(),
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      zip_code: '12345678',
      address: 'Centro, Rio - RJ',
      whatsapp: '12345678901',
      created_at: new Date()
    }

    InMemoryDatabase.getInstance().orgs.push(org01)
    InMemoryDatabase.getInstance().orgs.push(org02)

    await petsRepository.create({
      org_id: org01.id,
      name: 'Raimunda',
      about: 'Sobre a Raimunda',
      age: 'YOUNG_ADULT',
      size: 'MEDIUM',
      energy_level: 'MODERATE',
      independency_level: 'MODERATE',
      environment: 'SPACIOUS',
      images: ['link-image1.png', 'link-image2.png'],
      adoption_requirements: ['requisito 1']
    })

    await petsRepository.create({
      org_id: org02.id,
      name: 'Luluzinha',
      about: 'Sobre a Luluzinha',
      age: 'YOUNG_ADULT',
      size: 'MEDIUM',
      energy_level: 'MODERATE',
      independency_level: 'MODERATE',
      environment: 'SPACIOUS',
      images: ['link-image1.png', 'link-image2.png'],
      adoption_requirements: ['requisito 1']
    })

    const { pets } = await sut.execute({
      city: 'Manaus'
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Raimunda'
      })
    ])
  })

  it('should be able to list the pets by city and filters', async () => {
    const org01 = {
      id: randomUUID(),
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      zip_code: '12345678',
      address: 'Centro, Manaus - AM',
      whatsapp: '12345678901',
      created_at: new Date()
    }

    InMemoryDatabase.getInstance().orgs.push(org01)

    await petsRepository.create({
      org_id: org01.id,
      name: 'Raimunda',
      about: 'Sobre a Raimunda',
      age: 'YOUNG_ADULT',
      size: 'GIANT',
      energy_level: 'MODERATE',
      independency_level: 'MODERATE',
      environment: 'SPACIOUS',
      images: ['link-image1.png', 'link-image2.png'],
      adoption_requirements: ['requisito 1']
    })

    await petsRepository.create({
      org_id: org01.id,
      name: 'Luluzinha',
      about: 'Sobre a Luluzinha',
      age: 'YOUNG_ADULT',
      size: 'MEDIUM',
      energy_level: 'MODERATE',
      independency_level: 'MODERATE',
      environment: 'SPACIOUS',
      images: ['link-image1.png', 'link-image2.png'],
      adoption_requirements: ['requisito 1']
    })

    const { pets } = await sut.execute({
      city: 'Manaus',
      size: 'GIANT'
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({
        name: 'Raimunda'
      })
    ])
  })
})
