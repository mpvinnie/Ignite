import IUsersRepository from '@modules/accounts/repositories/IUsersRepository'
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository'
import { inject, injectable } from 'tsyringe'
import { v4 as uuid } from 'uuid'

import IDateProvider from '@shared/containers/providers/DateProvider/models/IDateProvider'
import IMailProvider from '@shared/containers/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError'

interface IRequest {
  email: string
}

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const token = uuid()

    const expires_date = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: token,
      expires_date
    })

    await this.mailProvider.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      body: `Segue o link para recuperar sua senha http://localhost:3000/reset-password/${token}`
    })
  }
}

export default SendForgotPasswordMailUseCase
