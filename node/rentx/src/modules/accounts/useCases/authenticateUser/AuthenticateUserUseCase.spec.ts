import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO'
import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoriyInMemory'

import AppError from '@shared/errors/AppError'

import CreateUserUseCase from '../createUser/CreateUserUseCase'
import AuthenticateUserUseCase from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory
    )
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it('should be able to authenticate user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    }

    await createUserUseCase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate a non-existent user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'non-existent-user-email',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123',
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    }

    await createUserUseCase.execute(user)

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
