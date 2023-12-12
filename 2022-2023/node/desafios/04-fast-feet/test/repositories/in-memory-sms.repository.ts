import { SmsRepository } from '@/domain/notification/application/repositories/sms.repository'
import { Sms } from '@/domain/notification/enterprise/entities/sms'

export class InMemorySmsRepository implements SmsRepository {
  public items: Sms[] = []

  async create(sms: Sms) {
    this.items.push(sms)
  }
}
