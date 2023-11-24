import { ShipmentsRepository } from '@/domain/delivery/application/repositories/shipments.repository'
import { Shipment } from '@/domain/delivery/enterprise/entities/shipment'

export class InMemoryShipmentsRepository implements ShipmentsRepository {
  public items: Shipment[] = []

  async create(shipment: Shipment) {
    this.items.push(shipment)
  }
}
