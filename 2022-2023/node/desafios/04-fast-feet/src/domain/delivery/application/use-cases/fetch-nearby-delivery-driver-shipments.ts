import { Either, right } from '@/core/either'
import { Shipment } from '../../enterprise/entities/shipment'
import { ShipmentsRepository } from '../repositories/shipments.repository'

interface FetchNearbyDeliveryDriverShipmentsUseCaseRequest {
  deliveryDriverId: string
  deliveryDriverLatitude: number
  deliveryDriverLongitude: number
}

type FetchNearbyDeliveryDriverShipmentsUseCaseResponse = Either<
  null,
  {
    shipments: Shipment[]
  }
>

export class FetchNearbyDeliveryDriverShipmentsUseCase {
  constructor(private shipmentsRepository: ShipmentsRepository) {}

  async execute({
    deliveryDriverId,
    deliveryDriverLatitude,
    deliveryDriverLongitude
  }: FetchNearbyDeliveryDriverShipmentsUseCaseRequest): Promise<FetchNearbyDeliveryDriverShipmentsUseCaseResponse> {
    const shipments =
      await this.shipmentsRepository.findManyNearbyByDeliveryDriverId({
        deliveryDriverId,
        deliveryDriverLatitude,
        deliveryDriverLongitude
      })

    return right({ shipments })
  }
}
