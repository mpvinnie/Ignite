import UsersRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import UsersTokensRepositoryInMemory from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory'

import DayjsDateProvider from '@shared/containers/providers/DateProvider/implementations/DayjsDateProvider'
import MailProviderInMemory from '@shared/containers/providers/MailProvider/in-memory/MailProviderInMemory'
import AppError from '@shared/errors/AppError'

import SendForgotPasswordMailUseCase from './SendForgotPasswordMailUseCase'

let usersRepositoryInMemory: UsersRepositoryInMemory
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let dateProvider: DayjsDateProvider
let mailProvider: MailProviderInMemory
let sendForgotPassowrdMail: SendForgotPasswordMailUseCase

describe('Send Forgot Mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
    dateProvider = new DayjsDateProvider()
    mailProvider = new MailProviderInMemory()
    sendForgotPassowrdMail = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    )
  })

  it('should be able to send a forgot passowrd mail to user', async () => {
    await usersRepositoryInMemory.create({
      name: 'Antonio Sharp',
      email: 'imecew@renarij.sv',
      driver_license: '676148',
      password: '123456'
    })

    const sendMail = spyOn(mailProvider, 'sendMail')

    await sendForgotPassowrdMail.execute({
      email: 'imecew@renarij.sv'
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to send a forgot passowrd mail to a non-existent user', async () => {
    await expect(
      sendForgotPassowrdMail.execute({
        email: 'imecew@renarij.sv'
      })
    ).rejects.toEqual(new AppError('User does not exists'))
  })

  it('should be able to create an user token', async () => {
    const create = spyOn(usersTokensRepositoryInMemory, 'create')

    await usersRepositoryInMemory.create({
      name: 'Antonio Sharp',
      email: 'imecew@renarij.sv',
      driver_license: '676148',
      password: '123456'
    })

    await sendForgotPassowrdMail.execute({
      email: 'imecew@renarij.sv'
    })

    expect(create).toHaveBeenCalled()
  })
})
