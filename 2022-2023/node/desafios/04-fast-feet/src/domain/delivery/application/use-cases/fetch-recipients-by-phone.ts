import { Either, right } from '@/core/either'
import { RecipientsRepository } from '../repositories/recipients.repository'
import { Recipient } from '../../enterprise/entities/recipient'

interface FetchRecipientsByPhoneUseCaseRequest {
  phone: string
}

type FetchRecipientsByPhoneUseCaseResponse = Either<
  null,
  {
    recipients: Recipient[]
  }
>

export class FetchRecipientsByPhoneUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    phone
  }: FetchRecipientsByPhoneUseCaseRequest): Promise<FetchRecipientsByPhoneUseCaseResponse> {
    const recipients = await this.recipientsRepository.findManyByPhone(phone)

    return right({ recipients })
  }
}
