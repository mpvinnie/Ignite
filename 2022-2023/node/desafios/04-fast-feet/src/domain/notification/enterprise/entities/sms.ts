import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface SmsProps {
  recipientPhone: string
  shipmentTrackingNumber: string
  content: string
  createdAt: Date
}

export class Sms extends Entity<SmsProps> {
  static create(props: Optional<SmsProps, 'createdAt'>, id?: UniqueEntityId) {
    const sms = new Sms(
      {
        ...props,
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return sms
  }

  get recipientPhone() {
    return this.props.recipientPhone
  }

  get shipmentTrackingNumber() {
    return this.props.shipmentTrackingNumber
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }
}
