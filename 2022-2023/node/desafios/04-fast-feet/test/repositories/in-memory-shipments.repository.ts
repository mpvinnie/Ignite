import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  FindManyNearbyByDeliveryDriverIdParams,
  ShipmentFilters,
  ShipmentsRepository
} from '@/domain/delivery/application/repositories/shipments.repository'
import { Shipment } from '@/domain/delivery/enterprise/entities/shipment'
import { InMemoryAttachmentsRepository } from './in-memory-attachments.repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { InMemoryRecipientsRepository } from './in-memory-recipients.repository'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryShipmentsRepository implements ShipmentsRepository {
  public items: Shipment[] = []

  constructor(
    private recipientsRepository: InMemoryRecipientsRepository,
    private attachmentsRepository: InMemoryAttachmentsRepository
  ) {}

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

  async findManyNearbyByDeliveryDriverId({
    deliveryDriverId,
    deliveryDriverLatitude,
    deliveryDriverLongitude
  }: FindManyNearbyByDeliveryDriverIdParams) {
    const promises = this.items.map(async item => {
      const recipient = await this.recipientsRepository.findById(
        item.recipientId.toValue()
      )

      if (!recipient) {
        return null
      }

      const distance = getDistanceBetweenCoordinates(
        {
          latitude: deliveryDriverLatitude,
          longitude: deliveryDriverLongitude
        },
        {
          latitude: recipient.latitude,
          longitude: recipient.longitude
        }
      )

      if (
        distance < 4 &&
        item.deliveryDriverId?.toValue() === deliveryDriverId &&
        item.status === 'IN_TRANSIT'
      ) {
        return item
      }

      return null
    })

    const shipments = (await Promise.all(promises)).filter(
      item => item !== null
    ) as Shipment[]

    return shipments
  }

  async create(shipment: Shipment) {
    this.items.push(shipment)

    DomainEvents.dispatchEventsForAggregate(shipment.id)
  }

  async save(shipment: Shipment) {
    if (shipment.attachment) {
      this.attachmentsRepository.create(shipment.attachment)
    }

    const itemIndex = this.items.findIndex(item => item.id === shipment.id)

    this.items[itemIndex] = shipment

    DomainEvents.dispatchEventsForAggregate(shipment.id)
  }

  async delete(shipment: Shipment) {
    const itemIndex = this.items.findIndex(item => item.id === shipment.id)

    this.items.splice(itemIndex, 1)
  }
}
