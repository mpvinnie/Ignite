import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'

import DayjsDateProvider from '@shared/containers/providers/DateProvider/implementations/DayjsDateProvider'
import AppError from '@shared/errors/AppError'

import CreateUserUseCase from '../createUser/CreateUserUseCase'
import AuthenticateUserUseCase from './AuthenticateUserUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let authenticateUser: AuthenticateUserUseCase
let createUser: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    authenticateUser = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider
    )
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
    ).rejects.toEqual(new AppError('Email or password incorrect', 401))
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
    ).rejects.toEqual(new AppError('Email or password incorrect', 401))
  })
})
