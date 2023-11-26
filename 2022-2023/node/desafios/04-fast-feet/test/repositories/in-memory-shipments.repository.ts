import { ShipmentsRepository } from '@/domain/delivery/application/repositories/shipments.repository'
import { Shipment } from '@/domain/delivery/enterprise/entities/shipment'

export class InMemoryShipmentsRepository implements ShipmentsRepository {
  public items: Shipment[] = []

  async findById(id: string) {
    const shipment = this.items.find(item => item.id.toValue() === id)

    if (!shipment) {
      return null
    }

    return shipment
  }

  async create(shipment: Shipment) {
    this.items.push(shipment)
  }

  async save(shipment: Shipment) {
    const itemIndex = this.items.findIndex(item => item.id === shipment.id)

    this.items[itemIndex] = shipment
  }
}
