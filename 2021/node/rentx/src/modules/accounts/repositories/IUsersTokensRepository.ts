import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO'
import IFindUserTokenDTO from '../dtos/IFindUserTokenDTO'
import UserToken from '../infra/typeorm/entities/UserToken'

export default interface IUsersTokensRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>
  findUserToken(data: IFindUserTokenDTO): Promise<UserToken>
  findByRefreshToken(refresh_token: string): Promise<UserToken>
  delete(userToken: UserToken): Promise<void>
}
