import { Sms } from '../../enterprise/entities/sms'

export abstract class SmsRepository {
  abstract create(sms: Sms): Promise<void>
}
