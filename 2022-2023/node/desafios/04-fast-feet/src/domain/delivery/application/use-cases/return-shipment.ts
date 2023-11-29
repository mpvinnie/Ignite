import { Either, left, right } from '@/core/either'
import { Shipment } from '../../enterprise/entities/shipment'
import { ShipmentsRepository } from '../repositories/shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { ShipmentNotInTransit } from './errors/shipment-not-in-transit.error'

interface ReturnShipmentUseCaseRequest {
  shipmentId: string
}

type ReturnShipmentUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    shipment: Shipment
  }
>

export class ReturnShipmentUseCase {
  constructor(private shipmentsRepository: ShipmentsRepository) {}

  async execute({
    shipmentId
  }: ReturnShipmentUseCaseRequest): Promise<ReturnShipmentUseCaseResponse> {
    const shipment = await this.shipmentsRepository.findById(shipmentId)

    if (!shipment) {
      return left(new ResourceNotFoundError())
    }

    if (shipment.status !== 'IN_TRANSIT') {
      return left(new ShipmentNotInTransit())
    }

    shipment.returnedAt = new Date()

    this.shipmentsRepository.save(shipment)

    return right({ shipment })
  }
}
