import { Sms } from '../../enterprise/entities/sms'
import { Either, right } from '@/core/either'
import { SmsRepository } from '../repositories/sms.repository'

export interface SendSmsUseCaseRequest {
  recipientPhone: string
  shipmentTrackingNumber: string
  content: string
}

export type SendSmsUseCaseResponse = Either<
  null,
  {
    sms: Sms
  }
>

export class SendSmsUseCase {
  constructor(private smsRepository: SmsRepository) {}

  async execute({
    recipientPhone,
    shipmentTrackingNumber,
    content
  }: SendSmsUseCaseRequest): Promise<SendSmsUseCaseResponse> {
    const sms = Sms.create({
      recipientPhone,
      shipmentTrackingNumber,
      content
    })

    console.log(sms)

    await this.smsRepository.create(sms)

    return right({ sms })
  }
}
