import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { expect, describe, it } from 'vitest'
import { RegisterUserUseCase } from './register-user-use-case'
import { compare } from 'bcryptjs'

describe('Register user', () => {
  it('should hash user password upon registration', async () => {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUser = new RegisterUserUseCase(prismaUsersRepository)

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
})
