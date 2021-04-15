import ICreateUserTokenDTO from '@modules/accounts/dtos/ICreateUserTokenDTO'
import IFindUserTokenDTO from '@modules/accounts/dtos/IFindUserTokenDTO'
import UserToken from '@modules/accounts/infra/typeorm/entities/UserToken'
import { v4 as uuid } from 'uuid'

import IUsersTokensRepository from '../IUsersTokensRepository'

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private users_tokens: UserToken[] = []

  async create({
    user_id,
    refresh_token,
    expires_date
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken()

    Object.assign(userToken, {
      id: uuid(),
      user_id,
      refresh_token,
      expires_date
    })

    this.users_tokens.push(userToken)

    return userToken
  }

  async findUserToken({
    user_id,
    token
  }: IFindUserTokenDTO): Promise<UserToken> {
    return this.users_tokens.find(
      userToken =>
        userToken.user_id === user_id && userToken.refresh_token === token
    )
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    return this.users_tokens.find(
      userToken => userToken.refresh_token === refresh_token
    )
  }

  async delete(userToken: UserToken): Promise<void> {
    this.users_tokens.splice(this.users_tokens.indexOf(userToken))
  }
}

export default UsersTokensRepositoryInMemory
