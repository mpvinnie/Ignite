import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterOrg } from './register-org'
import { compare } from 'bcryptjs'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'

let orgsRepository: InMemoryOrgsRepository
let sut: RegisterOrg

describe('Register org', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new RegisterOrg(orgsRepository)
  })

  it('should be able to register a org', async () => {
    const { org } = await sut.execute({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      zip_code: '12345678',
      address: 'John Doe Address',
      whatsapp: '12345678901'
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should hash the org password upon registration', async () => {
    const { org } = await sut.execute({
      responsible_name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      zip_code: '12345678',
      address: 'John Doe Address',
      whatsapp: '12345678901'
    })

    const isPasswordCorrectlyHashed = await compare('123456', org.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should be able to register a org', async () => {
    const email = 'johndoe@example.com'

    await sut.execute({
      responsible_name: 'John Doe',
      email,
      password: '123456',
      zip_code: '12345678',
      address: 'John Doe Address',
      whatsapp: '12345678901'
    })

    await expect(() => sut.execute({
      responsible_name: 'John Doe',
      email,
      password: '123456',
      zip_code: '12345678',
      address: 'John Doe Address',
      whatsapp: '12345678901'
    })).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
