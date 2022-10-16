import IUsersRepository from '@modules/accounts/repositories/IUsersRepository'
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository'
import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import IDateProvider from '@shared/containers/providers/DateProvider/models/IDateProvider'
import AppError from '@shared/errors/AppError'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('Token invalid')
    }

    if (
      this.dateProvider.isBefore({
        start_date: userToken.expires_date,
        end_date: this.dateProvider.dateNow()
      })
    ) {
      throw new AppError('Token expired')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersRepository.save(user)

    await this.usersTokensRepository.delete(userToken)
  }
}

export default ResetPasswordUseCase
