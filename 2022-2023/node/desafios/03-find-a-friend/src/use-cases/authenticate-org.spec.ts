import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { AuthenticateOrg } from './authenticate-org'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryDatabase } from '@/repositories/in-memory/in-memory-database'
import { cleanInMemoryDatabase } from '@/utils/test/clean-in-memory-database'

let inMemoryDatabase: InMemoryDatabase
let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrg

describe('Authenticate org', () => {
  beforeEach(() => {
    inMemoryDatabase = InMemoryDatabase.getInstance()
    orgsRepository = new InMemoryOrgsRepository(inMemoryDatabase)
    sut = new AuthenticateOrg(orgsRepository)
  })

  afterEach(() => {
    cleanInMemoryDatabase(inMemoryDatabase)
  })

  it('should be able to authenticate a org', async () => {
    await orgsRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      zip_code: '12345678',
      address: 'John Doe Address',
      whatsapp: '12345678901'
    })

    const { org } = await sut.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with a wrong or non-existent email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with a wrong password', async () => {
    await orgsRepository.create({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6),
      zip_code: '12345678',
      address: 'John Doe Address',
      whatsapp: '12345678901'
    })

    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
