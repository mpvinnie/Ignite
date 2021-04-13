import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'

import AppError from '@shared/errors/AppError'

import CreateUserUseCase from '../createUser/CreateUserUseCase'
import AuthenticateUserUseCase from './AuthenticateUserUseCase'

let authenticateUser: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUser: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUser = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUser = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate an user', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: '123456'
    })

    const result = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate a non-existent user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'non-existent-user-email',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with a incorrect password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
      driver_license: '123456'
    })

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'incorrect-passwrod'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
