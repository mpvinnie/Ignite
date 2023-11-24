import { Either, left, right } from '@/core/either'
import { Shipment } from '../../enterprise/entities/shipment'
import { RecipientsRepository } from '../repositories/recipients.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { generateTrackingNumber } from '@/utils/generate-tracking-number'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ShipmentsRepository } from '../repositories/shipments.repository'

interface RegisterShipmentUseCaseRequest {
  recipientId: string
  weightInGrams: number
}

type RegisterShipmentUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    shipment: Shipment
  }
>

export class RegisterShipmentUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private shipmentsRepository: ShipmentsRepository
  ) {}

  async execute({
    recipientId,
    weightInGrams
  }: RegisterShipmentUseCaseRequest): Promise<RegisterShipmentUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipientId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    const trackingNumber = generateTrackingNumber()

    const shipment = Shipment.create({
      recipientId: new UniqueEntityId(recipientId),
      trackingNumber,
      weightInGrams
    })

    await this.shipmentsRepository.create(shipment)

    return right({ shipment })
  }
}
