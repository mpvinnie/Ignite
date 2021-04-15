import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUserTokenDTO'
import IFindUserTokenDTO from '@modules/accounts/dtos/IFindUserTokenDTO'
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository'
import { getRepository, Repository } from 'typeorm'

import UserToken from '../entities/UserToken'

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>

  constructor() {
    this.repository = getRepository(UserToken)
  }

  async create({
    user_id,
    refresh_token,
    expires_date
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date
    })

    await this.repository.save(userToken)

    return userToken
  }

  async findUserToken({
    user_id,
    token
  }: IFindUserTokenDTO): Promise<UserToken> {
    return await this.repository.findOne({ user_id, refresh_token: token })
  }

  async delete(userToken: UserToken): Promise<void> {
    await this.repository.delete(userToken.id)
  }
}

export default UsersTokensRepository
