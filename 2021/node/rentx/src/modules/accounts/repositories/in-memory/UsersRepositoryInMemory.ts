import ICreateUserDTO from '@modules/accounts/dtos/ICreateUserDTO'
import User from '@modules/accounts/infra/typeorm/entities/User'
import { v4 as uuid } from 'uuid'

import IUsersRepository from '../IUsersRepository'

class UsersRepositoryInMemory implements IUsersRepository {
  private users: User[] = []

  async create({
    name,
    email,
    password,
    driver_license
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
      driver_license
    })

    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id)
  }

  async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[findIndex] = user

    return this.users[findIndex]
  }
}

export default UsersRepositoryInMemory
