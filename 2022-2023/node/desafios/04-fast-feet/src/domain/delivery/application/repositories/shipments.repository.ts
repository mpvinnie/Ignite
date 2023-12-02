import { PaginationParams } from '@/core/repositories/pagination-params'
import { Shipment, ShipmentStatus } from '../../enterprise/entities/shipment'

export interface ShipmentFilters {
  rangeInitialDate: Date
  rangeFinalDate: Date
  status?: ShipmentStatus
}

export interface FindManyNearbyByDeliveryDriverIdParams {
  deliveryDriverId: string
  deliveryDriverLatitude: number
  deliveryDriverLongitude: number
}

export abstract class ShipmentsRepository {
  abstract findById(id: string): Promise<Shipment | null>
  abstract findManyByDateRange(
    params: PaginationParams & ShipmentFilters
  ): Promise<Shipment[]>
  abstract findManyByRecipientId(recipientId: string): Promise<Shipment[]>
  abstract findManyNearbyByDeliveryDriverId(
    params: FindManyNearbyByDeliveryDriverIdParams
  ): Promise<Shipment[]>
  abstract create(shipment: Shipment): Promise<void>
  abstract save(shipment: Shipment): Promise<void>
  abstract delete(shipment: Shipment): Promise<void>
}
