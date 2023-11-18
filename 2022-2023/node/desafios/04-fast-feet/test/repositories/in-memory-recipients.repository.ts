import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients.repository'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async findById(id: string) {
    const recipient = this.items.find(item => item.id.toValue() === id)

    if (!recipient) {
      return null
    }

    return recipient
  }

  async findManyByPhone(phone: string) {
    const recipients = this.items.filter(item => item.phone === phone)

    return recipients
  }

  async create(recipient: Recipient) {
    this.items.push(recipient)
  }

  async save(recipient: Recipient) {
    const itemIndex = this.items.findIndex(item => item.id === recipient.id)

    this.items[itemIndex] = recipient
  }
}
