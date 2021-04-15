import nodemailer, { Transporter } from 'nodemailer'

import AppError from '@shared/errors/AppError'

import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

class EtherealMailProvider implements IMailProvider {
  private client: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then(account => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass
          }
        })

        this.client = transporter
      })
      .catch(err => {
        throw new AppError(`Error: ${err.message}`)
      })
  }

  async sendMail({ to, subject, body }: ISendMailDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: '[Rentx] <noreplay@rentx.com.br>',
      to,
      subject,
      text: body,
      html: body
    })

    console.log(`Message sent: ${message.messageId}`)
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`)
  }
}

export default EtherealMailProvider
