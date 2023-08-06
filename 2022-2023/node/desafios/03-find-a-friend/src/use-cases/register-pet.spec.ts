import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { RegisterPet } from './register-pet'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryDatabase } from '@/repositories/in-memory/in-memory-database'
import { cleanInMemoryDatabase } from '@/utils/test/clean-in-memory-database'

let inMemoryDatabase: InMemoryDatabase
let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPet

describe('Register pet', () => {
  beforeEach(() => {
    inMemoryDatabase = InMemoryDatabase.getInstance()

    orgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    petsRepository = new InMemoryPetsRepository(inMemoryDatabase)

    sut = new RegisterPet(orgsRepository, petsRepository)
  })

  afterEach(() => {
    cleanInMemoryDatabase(inMemoryDatabase)
  })

  it('should be able to register a pet', async () => {
    const org = await orgsRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      zip_code: '12345678',
      address: 'John Doe Address',
      whatsapp: '12345678901'
    })

    const { pet } = await sut.execute({
      orgId: org.id,
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

    const petImages = InMemoryDatabase.getInstance().images.filter(
      item => item.pet_id === pet.id
    )

    const petAdoptionRequirements =
      InMemoryDatabase.getInstance().adoption_requirements.filter(
        item => item.pet_id === pet.id
      )

    expect(pet.id).toEqual(expect.any(String))
    expect(petImages).toHaveLength(2)
    expect(petAdoptionRequirements).toHaveLength(1)
  })

  it('should not be able to register a pet with a non-existent org', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existent-org-id',
        name: 'Luluzinha',
        about: 'Sobre a Luluzinha',
        age: 'YOUNG_ADULT',
        size: 'MEDIUM',
        energy_level: 'MODERATE',
        independency_level: 'MODERATE',
        environment: 'SPACIOUS',
        images: ['link-image1.png', 'link-image2.png'],
        adoption_requirements: ['requisito 1', 'requisito 2']
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
