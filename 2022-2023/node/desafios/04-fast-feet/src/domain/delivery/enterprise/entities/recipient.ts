import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface RecipientProps {
  name: string
  phone: string
  streetNumber: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  complement?: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Recipient extends Entity<RecipientProps> {
  static create(
    props: Optional<RecipientProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const recipient = new Recipient(
      {
        ...props,
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return recipient
  }

  get name() {
    return this.props.name
  }

  get phone() {
    return this.props.phone
  }

  get streetNumber() {
    return this.props.streetNumber
  }

  get street() {
    return this.props.street
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get zipCode() {
    return this.props.zipCode
  }

  get country() {
    return this.props.country
  }

  get complement() {
    return this.props.complement
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
