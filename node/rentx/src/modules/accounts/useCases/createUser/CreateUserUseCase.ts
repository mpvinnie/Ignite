import User from '@modules/accounts/infra/typeorm/entities/User'
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository'
import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

interface IRequest {
  name: string
  email: string
  password: string
  driver_license: string
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driver_license
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      driver_license
    })

    return user
  }
}

export default CreateUserUseCase
