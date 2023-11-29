import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { Shipment } from '../../enterprise/entities/shipment'
import { ShipmentsRepository } from '../repositories/shipments.repository'
import { ShipmentNotInPreparationError } from './errors/shipment-not-in-preparation.error'

interface SetShipmentAvailableForPickupRequest {
  shipmentId: string
}

type SetShipmentAvailableForPickupResponse = Either<
  ResourceNotFoundError | ShipmentNotInPreparationError,
  {
    shipment: Shipment
  }
>

export class SetShipmentAvailableForPickup {
  constructor(private shipmentsRepository: ShipmentsRepository) {}

  async execute({
    shipmentId
  }: SetShipmentAvailableForPickupRequest): Promise<SetShipmentAvailableForPickupResponse> {
    const shipment = await this.shipmentsRepository.findById(shipmentId)

    if (!shipment) {
      return left(new ResourceNotFoundError())
    }

    if (shipment.status !== 'PREPARING') {
      return left(new ShipmentNotInPreparationError())
    }

    shipment.availableForPickupAt = new Date()

    await this.shipmentsRepository.save(shipment)

    return right({ shipment })
  }
}
