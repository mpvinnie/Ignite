import { Either, left, right } from '@/core/either'
import { Recipient } from '../../enterprise/entities/recipient'
import { RecipientsRepository } from '../repositories/recipients.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

interface EditRecipientUseCaseRequest {
  recipientId: string
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

type EditRecipientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipient: Recipient
  }
>

export class EditRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({
    recipientId,
    name,
    phone,
    streetNumber,
    street,
    neighborhood,
    city,
    state,
    zipCode,
    country,
    complement,
    latitude,
    longitude
  }: EditRecipientUseCaseRequest): Promise<EditRecipientUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    recipient.name = name
    recipient.phone = phone
    recipient.streetNumber = streetNumber
    recipient.street = street
    recipient.neighborhood = neighborhood
    recipient.city = city
    recipient.state = state
    recipient.zipCode = zipCode
    recipient.country = country
    recipient.complement = complement
    recipient.latitude = latitude
    recipient.longitude = longitude

    await this.recipientsRepository.save(recipient)

    return right({ recipient })
  }
}
