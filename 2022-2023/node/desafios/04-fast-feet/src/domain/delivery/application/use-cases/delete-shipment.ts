import { Either, left, right } from '@/core/either'
import { ShipmentsRepository } from '../repositories/shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { NotAllowedError } from './errors/not-allowed.error'

interface DeleteShipmentUseCaseRequest {
  shipmentId: string
}

type DeleteShipmentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteShipmentUseCase {
  constructor(private shipmentsRepository: ShipmentsRepository) {}

  async execute({
    shipmentId
  }: DeleteShipmentUseCaseRequest): Promise<DeleteShipmentUseCaseResponse> {
    const shipment = await this.shipmentsRepository.findById(shipmentId)

    if (!shipment) {
      return left(new ResourceNotFoundError())
    }

    if (
      shipment.deliveryDriverId &&
      !(shipment.deliveredAt || shipment.returnedAt)
    ) {
      return left(new NotAllowedError())
    }

    await this.shipmentsRepository.delete(shipment)

    return right({})
  }
}
