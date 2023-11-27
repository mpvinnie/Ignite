import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  ShipmentFilters,
  ShipmentsRepository
} from '@/domain/delivery/application/repositories/shipments.repository'
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

  async findManyByDateRange({
    page,
    rangeInitialDate,
    rangeFinalDate,
    status
  }: PaginationParams & ShipmentFilters) {
    const shipments = this.items
      .filter(item => {
        const inRange =
          item.createdAt >= rangeInitialDate && item.createdAt <= rangeFinalDate
        const statusMatched = status ? item.status === status : true

        return inRange && statusMatched
      })
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20)

    return shipments
  }

  async findManyByRecipientId(recipientId: string) {
    const shipments = this.items
      .filter(item => item.recipientId.toValue() === recipientId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

    return shipments
  }

  async create(shipment: Shipment) {
    this.items.push(shipment)
  }

  async save(shipment: Shipment) {
    const itemIndex = this.items.findIndex(item => item.id === shipment.id)

    this.items[itemIndex] = shipment
  }

  async delete(shipment: Shipment) {
    const itemIndex = this.items.findIndex(item => item.id === shipment.id)

    this.items.splice(itemIndex, 1)
  }
}
