import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Attachment } from './attachment'
import { Optional } from '@/core/types/optional'
import { ShipmentCreatedEvent } from '../events/shipment-created.event'
import { ShipmentPickedUpEvent } from '../events/shipment-picked-up.event'
import { ShipmentDeliveredEvent } from '../events/shipment-delivered.event'

export type ShipmentStatus =
  | 'PREPARING'
  | 'AVAILABLE_FOR_PICKUP'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'RETURNED'

export interface ShipmentProps {
  deliveryDriverId?: UniqueEntityId | null
  recipientId: UniqueEntityId
  trackingNumber: string
  weightInGrams: number
  status: ShipmentStatus
  availableForPickupAt?: Date | null
  inTransitAt?: Date | null
  deliveredAt?: Date | null
  returnedAt?: Date | null
  attachment?: Attachment | null
  createdAt: Date
  updatedAt?: Date | null
}

export class Shipment extends AggregateRoot<ShipmentProps> {
  static create(
    props: Optional<ShipmentProps, 'status' | 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const shipment = new Shipment(
      {
        ...props,
        status: props.status ?? 'PREPARING',
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    const isNewShipment = !id

    if (isNewShipment) {
      shipment.addDomainEvent(new ShipmentCreatedEvent(shipment))
    }

    return shipment
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get deliveryDriverId() {
    return this.props.deliveryDriverId
  }

  set deliveryDriverId(deliveryDriverId: UniqueEntityId | undefined | null) {
    if (deliveryDriverId && deliveryDriverId !== this.props.deliveryDriverId) {
      this.addDomainEvent(new ShipmentPickedUpEvent(this))
    }

    this.props.deliveryDriverId = deliveryDriverId

    this.touch()
  }

  get recipientId() {
    return this.props.recipientId
  }

  set recipientId(recipientId: UniqueEntityId) {
    this.props.recipientId = recipientId

    this.touch()
  }

  get trackingNumber() {
    return this.props.trackingNumber
  }

  get weightInGrams() {
    return this.props.weightInGrams
  }

  set weightInGrams(weightInGrams: number) {
    this.props.weightInGrams = weightInGrams

    this.touch()
  }

  get status() {
    return this.props.status
  }

  get availableForPickupAt() {
    return this.props.availableForPickupAt
  }

  set availableForPickupAt(availableForPickupAt: Date | undefined | null) {
    this.props.availableForPickupAt = availableForPickupAt

    this.props.status = 'AVAILABLE_FOR_PICKUP'

    this.touch()
  }

  get inTransitAt() {
    return this.props.inTransitAt
  }

  set inTransitAt(inTransitAt: Date | undefined | null) {
    this.props.inTransitAt = inTransitAt

    this.props.status = 'IN_TRANSIT'

    this.touch()
  }

  get deliveredAt() {
    return this.props.deliveredAt
  }

  get returnedAt() {
    return this.props.returnedAt
  }

  set returnedAt(returnedAt: Date | undefined | null) {
    this.props.returnedAt = returnedAt

    this.props.status = 'RETURNED'

    this.touch()
  }

  get attachment() {
    return this.props.attachment
  }

  set attachment(attachment: Attachment | undefined | null) {
    if (attachment && attachment !== this.props.attachment) {
      this.addDomainEvent(new ShipmentDeliveredEvent(this))
    }

    this.props.attachment = attachment

    this.props.deliveredAt = new Date()
    this.props.status = 'DELIVERED'

    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.deliveryDriverId
  }
}
