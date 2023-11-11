import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients.repository'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async findManyByPhone(phone: string) {
    const recipients = this.items.filter(item => item.phone === phone)

    return recipients
  }

  async create(recipient: Recipient) {
    this.items.push(recipient)
  }
}
