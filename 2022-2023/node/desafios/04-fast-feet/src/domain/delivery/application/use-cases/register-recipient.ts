import { Either, right } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients.repository'

interface RegisterRecipientUseCaseRequest {
  name: string
  phone: string
  streetNumber: string
  street: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  country: string
  complement?: string
  latitude: number
  longitude: number
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
    neighborhood,
    city,
    state,
    country,
    zipCode,
    complement,
    latitude,
    longitude
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipient = Recipient.create({
      name,
      phone,
      streetNumber,
      street,
      neighborhood,
      city,
      state,
      country,
      zipCode,
      complement,
      latitude,
      longitude
    })

    await this.recipientsRepository.create(recipient)

    return right({ recipient })
  }
}
