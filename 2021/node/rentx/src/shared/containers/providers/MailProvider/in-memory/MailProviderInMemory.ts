import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

class MailProviderInMemory implements IMailProvider {
  private message: ISendMailDTO[] = []

  async sendMail(mail: ISendMailDTO): Promise<void> {
    this.message.push(mail)
  }
}

export default MailProviderInMemory
