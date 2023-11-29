import { Either, left, right } from '@/core/either'
import { Shipment } from '../../enterprise/entities/shipment'
import { DeliveryDriversRepository } from '../repositories/delivery-drivers.repository'
import { ShipmentsRepository } from '../repositories/shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ShipmentNotAvailableForPickupError } from './errors/shipment-not-available-for-pickup.error'

interface PickUpShipmentUseCaseRequest {
  deliveryDriverId: string
  shipmentId: string
}

type PickUpShipmentUseCaseResponse = Either<
  ResourceNotFoundError | ShipmentNotAvailableForPickupError,
  {
    shipment: Shipment
  }
>

export class PickUpShipmentUseCase {
  constructor(
    private deliveryDriversRepository: DeliveryDriversRepository,
    private shipmentsRepository: ShipmentsRepository
  ) {}

  async execute({
    deliveryDriverId,
    shipmentId
  }: PickUpShipmentUseCaseRequest): Promise<PickUpShipmentUseCaseResponse> {
    const deliveryDriver =
      await this.deliveryDriversRepository.findById(deliveryDriverId)

    if (!deliveryDriver) {
      return left(new ResourceNotFoundError())
    }

    const shipment = await this.shipmentsRepository.findById(shipmentId)

    if (!shipment) {
      return left(new ResourceNotFoundError())
    }

    if (shipment.status !== 'AVAILABLE_FOR_PICKUP') {
      return left(new ShipmentNotAvailableForPickupError())
    }

    shipment.inTransitAt = new Date()
    shipment.deliveryDriverId = new UniqueEntityId(deliveryDriverId)

    await this.shipmentsRepository.save(shipment)

    return right({ shipment })
  }
}
