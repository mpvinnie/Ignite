import { Either, right } from '@/core/either'
import { Shipment, ShipmentStatus } from '../../enterprise/entities/shipment'
import { ShipmentsRepository } from '../repositories/shipments.repository'

interface FetchShipmentsByFiltersUseCaseRequest {
  page: number
  rangeInitialDate: Date
  rangeFinalDate: Date
  status?: ShipmentStatus
}

type FetchShipmentsByFiltersUseCaseResponse = Either<
  null,
  {
    shipments: Shipment[]
  }
>

export class FetchShipmentsByFiltersUseCase {
  constructor(private shipmentsRepository: ShipmentsRepository) {}

  async execute({
    page,
    rangeInitialDate,
    rangeFinalDate,
    status
  }: FetchShipmentsByFiltersUseCaseRequest): Promise<FetchShipmentsByFiltersUseCaseResponse> {
    const shipments = await this.shipmentsRepository.findManyByDateRange({
      page,
      rangeInitialDate,
      rangeFinalDate,
      status
    })

    return right({ shipments })
  }
}
