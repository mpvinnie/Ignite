import { AppError } from "../../../../shared/errors/AppError"
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUser: AuthenticateUserUseCase
let createUser: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    authenticateUser = new AuthenticateUserUseCase(inMemoryUsersRepository)
    createUser = new CreateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate user', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response).toHaveProperty('user')
  })

  it('should not be able to authenticate a non-existent user', async () => {
    await expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with incorrect password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(authenticateUser.execute({
      email: 'johndoe@example.com',
      password: 'incorrect-password'
    })).rejects.toBeInstanceOf(AppError)
  })
})
