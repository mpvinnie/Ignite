import { Shipment } from '../../enterprise/entities/shipment'

export abstract class ShipmentsRepository {
  abstract findById(id: string): Promise<Shipment | null>
  abstract create(shipment: Shipment): Promise<void>
  abstract save(shipment: Shipment): Promise<void>
  abstract delete(shipment: Shipment): Promise<void>
}
