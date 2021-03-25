import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import AppError from '../../../../errors/AppError'
import ICreateUserDTO from '../../dtos/ICreateUserDTO'
import IUsersRepository from '../../repositories/IUsersRepsotory'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    name,
    email,
    driver_licence,
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
      driver_licence,
      password: hashedPassword
    })
  }
}

export default CreateUserUseCase
