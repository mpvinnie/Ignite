import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO'
import IUsersRepository from '@modules/accounts/repositories/IUsersRepsotory'
import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import AppError from '@shared/errors/AppError'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password
  }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const hashedPassword = await hash(password, 10)

    await this.usersRepository.create({
      name,
      email,
      driver_license,
      password: hashedPassword
    })
  }
}

export default CreateUserUseCase
