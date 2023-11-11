import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients.repository'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = []

  async create(recipient: Recipient) {
    this.items.push(recipient)
  }
}
