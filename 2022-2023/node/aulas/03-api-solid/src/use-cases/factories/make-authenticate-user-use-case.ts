import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUserUseCase } from '../authenticate-user-use-case'

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository)

  return authenticateUserUseCase
}
