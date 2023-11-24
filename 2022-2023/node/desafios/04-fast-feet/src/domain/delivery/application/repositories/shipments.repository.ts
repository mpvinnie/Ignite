import { Shipment } from '../../enterprise/entities/shipment'

export abstract class ShipmentsRepository {
  abstract create(shipment: Shipment): Promise<void>
}
