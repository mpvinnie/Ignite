import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface RecipientProps {
  name: string
  phone: string
  streetNumber: string
  street: string
  neighborhood: string
  city: string
  state: string
  country: string
  zipCode: string
  complement?: string
  latitude: number
  longitude: number
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

  get neighborhood() {
    return this.props.neighborhood
  }

  get city() {
    return this.props.city
  }

  get state() {
    return this.props.state
  }

  get country() {
    return this.props.country
  }

  get zipCode() {
    return this.props.zipCode
  }

  get complement() {
    return this.props.complement
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
