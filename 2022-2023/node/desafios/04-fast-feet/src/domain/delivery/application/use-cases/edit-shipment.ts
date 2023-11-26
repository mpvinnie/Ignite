import { Either, left, right } from '@/core/either'
import { Shipment } from '../../enterprise/entities/shipment'
import { RecipientsRepository } from '../repositories/recipients.repository'
import { ShipmentsRepository } from '../repositories/shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface EditShipmentUseCaseRequest {
  shipmentId: string
  recipientId: string
  weightInGrams: number
}

type EditShipmentUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    shipment: Shipment
  }
>

export class EditShipmentUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private shipmentsRepository: ShipmentsRepository
  ) {}

  async execute({
    shipmentId,
    recipientId,
    weightInGrams
  }: EditShipmentUseCaseRequest): Promise<EditShipmentUseCaseResponse> {
    const shipment = await this.shipmentsRepository.findById(shipmentId)

    if (!shipment) {
      return left(new ResourceNotFoundError())
    }

    if (shipment.recipientId.toValue() !== recipientId) {
      const recipient = await this.recipientsRepository.findById(recipientId)

      if (!recipient) {
        return left(new ResourceNotFoundError())
      }

      shipment.recipientId = new UniqueEntityId(recipientId)
    }

    shipment.weightInGrams = weightInGrams

    await this.shipmentsRepository.save(shipment)

    return right({ shipment })
  }
}
