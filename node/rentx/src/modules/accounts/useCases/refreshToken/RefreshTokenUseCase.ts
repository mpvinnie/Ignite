import auth from '@config/auth'
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository'
import { sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import IDateProvider from '@shared/containers/providers/DateProvider/models/IDateProvider'
import AppError from '@shared/errors/AppError'

interface IRequest {
  token: string
}

interface IPayload {
  sub: string
  email: string
}

interface ITokenResponse {
  token: string
  refresh_token: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider
  ) {}

  async execute({ token }: IRequest): Promise<ITokenResponse> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken = await this.usersTokensRepository.findUserToken({
      user_id,
      token
    })

    if (!userToken) {
      throw new AppError('Refresh token does not exists')
    }

    await this.usersTokensRepository.delete(userToken)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_refresh_token_days
    })

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    )

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date
    })

    const newToken = sign({}, auth.secret_token, {
      subject: user_id,
      expiresIn: auth.expires_in_token
    })

    return {
      token: newToken,
      refresh_token
    }
  }
}

export default RefreshTokenUseCase
