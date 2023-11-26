import { PaginationParams } from '@/core/repositories/pagination-params'
import { Shipment, ShipmentStatus } from '../../enterprise/entities/shipment'

export interface ShipmentFilters {
  rangeInitialDate: Date
  rangeFinalDate: Date
  status?: ShipmentStatus
}

export abstract class ShipmentsRepository {
  abstract findById(id: string): Promise<Shipment | null>
  abstract findManyByDateRange(
    params: PaginationParams & ShipmentFilters
  ): Promise<Shipment[]>
  abstract create(shipment: Shipment): Promise<void>
  abstract save(shipment: Shipment): Promise<void>
  abstract delete(shipment: Shipment): Promise<void>
}
