import { Either, left, right } from '@/core/either'
import { Shipment } from '../../enterprise/entities/shipment'
import { ShipmentsRepository } from '../repositories/shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

interface GetShipmentByIdUseCaseRequest {
  shipmentId: string
}

type GetShipmentByIdUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    shipment: Shipment
  }
>

export class GetShipmentByIdUseCase {
  constructor(private shipmentsRepository: ShipmentsRepository) {}

  async execute({
    shipmentId
  }: GetShipmentByIdUseCaseRequest): Promise<GetShipmentByIdUseCaseResponse> {
    const shipment = await this.shipmentsRepository.findById(shipmentId)

    if (!shipment) {
      return left(new ResourceNotFoundError())
    }

    return right({ shipment })
  }
}
