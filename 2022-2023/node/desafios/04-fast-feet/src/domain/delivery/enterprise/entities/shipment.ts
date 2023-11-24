import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Attachment } from './attachment'
import { Optional } from '@/core/types/optional'

export interface ShipmentProps {
  deliveryDriverId?: UniqueEntityId | null
  recipientId: UniqueEntityId
  trackingNumber: string
  weightInGrams: number
  availableForPickupAt?: Date | null
  inTransitAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
  attachment?: Attachment
  createdAt: Date | null
  updatedAt?: Date | null
}

export class Shipment extends AggregateRoot<ShipmentProps> {
  static create(
    props: Optional<ShipmentProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const shipment = new Shipment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return shipment
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get deliveryDriverId() {
    return this.props.deliveryDriverId
  }

  get recipientId() {
    return this.props.recipientId
  }

  get trackingNumber() {
    return this.props.trackingNumber
  }

  get weightInGrams() {
    return this.props.weightInGrams
  }

  get availableForPickupAt() {
    return this.props.availableForPickupAt
  }

  get inTransitAt() {
    return this.props.inTransitAt
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  get attachment() {
    return this.props.attachment
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.deliveryDriverId
  }
}
