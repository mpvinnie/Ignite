import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { Shipment } from '../entities/shipment'

export class ShipmentReturnedEvent implements DomainEvent {
  public ocurredAt: Date
  public shipment: Shipment

  constructor(shipment: Shipment) {
    this.shipment = shipment
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityId {
    return this.shipment.id
  }
}
