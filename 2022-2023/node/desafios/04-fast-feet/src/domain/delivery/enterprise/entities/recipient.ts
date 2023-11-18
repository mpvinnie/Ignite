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

  private touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  get streetNumber() {
    return this.props.streetNumber
  }

  set streetNumber(streetNumber: string) {
    this.props.streetNumber = streetNumber
    this.touch()
  }

  get street() {
    return this.props.street
  }

  set street(street: string) {
    this.props.street = street
    this.touch()
  }

  get neighborhood() {
    return this.props.neighborhood
  }

  set neighborhood(neighborhood: string) {
    this.props.neighborhood = neighborhood
    this.touch()
  }

  get city() {
    return this.props.city
  }

  set city(city: string) {
    this.props.city = city
    this.touch()
  }

  get state() {
    return this.props.state
  }

  set state(state: string) {
    this.props.state = state
    this.touch()
  }

  get country() {
    return this.props.country
  }

  set country(country: string) {
    this.props.country = country
    this.touch()
  }

  get zipCode() {
    return this.props.zipCode
  }

  set zipCode(zipCode: string) {
    this.props.zipCode = zipCode
    this.touch()
  }

  get complement() {
    return this.props.complement
  }

  set complement(complement: string | undefined) {
    this.props.complement = complement
    this.touch()
  }

  get latitude() {
    return this.props.latitude
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
    this.touch()
  }

  get longitude() {
    return this.props.longitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }
}
