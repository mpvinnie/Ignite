import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUserUseCase } from './register-user-use-case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let registerUser: RegisterUserUseCase

describe('Register user', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUser = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register user', async () => {
    const { user } = await registerUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await registerUser.execute({
      name: 'John Doe',
      email,
      password: '123456',
    })

    await expect(() =>
      registerUser.execute({
        name: 'John Doe',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
