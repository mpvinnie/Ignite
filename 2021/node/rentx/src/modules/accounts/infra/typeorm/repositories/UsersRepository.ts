import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO'
import IUsersRepository from '@modules/accounts/repositories/IUsersRepository'
import { getRepository, Repository } from 'typeorm'

import User from '../entities/User'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  async create({
    name,
    email,
    password,
    driver_license
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license
    })

    await this.repository.save(user)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({ email })
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id)
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user)
  }
}

export default UsersRepository
