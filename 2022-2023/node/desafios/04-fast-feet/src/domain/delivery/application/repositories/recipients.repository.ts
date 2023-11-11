import { Recipient } from '../../enterprise/entities/recipient'

export abstract class RecipientsRepository {
  abstract findManyByPhone(phone: string): Promise<Recipient[]>
  abstract create(recipient: Recipient): Promise<void>
}
