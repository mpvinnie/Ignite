import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { GetOrgProfile } from './get-org-profile'
import { hash } from 'bcryptjs'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryDatabase } from '@/repositories/in-memory/in-memory-database'
import { cleanInMemoryDatabase } from '@/utils/test/clean-in-memory-database'

let inMemoryDatabase: InMemoryDatabase
let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfile

describe('Get org profile', () => {
  beforeEach(() => {
    inMemoryDatabase = InMemoryDatabase.getInstance()
    orgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new GetOrgProfile(orgsRepository)
  })

  afterEach(() => {
    cleanInMemoryDatabase(inMemoryDatabase)
  })

  it('should be able to get the org profile', async () => {
    const createdOrg = await orgsRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      zip_code: '12345678',
      address: 'John Doe Address',
      whatsapp: '12345678901'
    })

    const { org } = await sut.execute({
      orgId: createdOrg.id
    })

    expect(org.id).toEqual(createdOrg.id)
  })

  it('should not be able to get the profile of a non-existent org', async () => {
    await expect(() =>
      sut.execute({
        orgId: 'non-existent-org-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
