import { Either, right } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients.repository'

interface RegisterRecipientUseCaseRequest {
  name: string
  phone: string
  streetNumber: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  complement?: string
}

type RegisterRecipientUseCaseResponse = Either<
  null,
  {
    recipient: Recipient
  }
>

export class RegisterRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    name,
    phone,
    streetNumber,
    street,
    city,
    state,
    country,
    zipCode,
    complement
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      name,
      phone,
      streetNumber,
      street,
      city,
      state,
      country,
      zipCode,
      complement
    })

    await this.recipientsRepository.create(recipient)

    return right({ recipient })
  }
}
