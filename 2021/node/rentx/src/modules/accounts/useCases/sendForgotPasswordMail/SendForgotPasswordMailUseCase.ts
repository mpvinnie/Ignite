import IUsersRepository from '@modules/accounts/repositories/IUsersRepository'
import IUsersTokensRepository from '@modules/accounts/repositories/IUsersTokensRepository'
import { resolve } from 'path'
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

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    )

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

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    }

    await this.mailProvider.sendMail({
      to: email,
      subject: 'Recuperação de senha',
      variables,
      path: templatePath
    })
  }
}

export default SendForgotPasswordMailUseCase
