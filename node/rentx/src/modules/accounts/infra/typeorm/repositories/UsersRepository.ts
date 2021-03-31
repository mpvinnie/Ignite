import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO'
import User from '@modules/accounts/infra/typeorm/entities/User'
import IUsersRepository from '@modules/accounts/repositories/IUsersRepsotory'
import { getRepository, Repository } from 'typeorm'

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }
  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id)
    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })
    return user
  }

  async create({
    id,
    name,
    email,
    driver_license,
    password,
    avatar
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      id,
      name,
      email,
      driver_license,
      password,
      avatar
    })

    await this.repository.save(user)
  }
}

export default UsersRepository
