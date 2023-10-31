import { Slug } from './value-objects/slug'
import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export type Size = 'small' | 'medium' | 'big' | 'large'
export type Color =
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'

export interface ProductProps {
  name: string
  slug: Slug
  price: number
  description?: string | null
  size?: Size | null
  color?: Color | null
  inStock: number
  minStock: number
  createdAt: Date
  updatedAt?: Date | null
}

export class Product extends Entity<ProductProps> {
  static create(
    props: Optional<ProductProps, 'slug' | 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const product = new Product(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.name),
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return product
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.props.slug = Slug.createFromText(name)
    this.touch()
  }

  get slug() {
    return this.props.slug
  }

  get price() {
    return this.props.price
  }

  set price(price: number) {
    if (price < 0) {
      throw new Error('price cannot be less than 0')
    }

    this.props.price = price
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string | null | undefined) {
    this.description = description
    this.touch()
  }

  get size() {
    return this.props.size
  }

  set size(size: Size | null | undefined) {
    this.size = size
    this.touch()
  }

  get color() {
    return this.props.color
  }

  set color(color: Color | null | undefined) {
    this.color = color
    this.touch()
  }

  get inStock() {
    return this.props.inStock
  }

  get minStock() {
    return this.props.minStock
  }

  set minStock(minStock: number) {
    if (minStock < 0) {
      throw new Error('minStock cannot be less than 0')
    }

    this.props.minStock = minStock
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  decreaseInStock(quantity?: number) {
    if (quantity && quantity <= 0) {
      throw new Error('Quantity in stock cannot be less or equal than 0.')
    }

    const newQuantityInStock = this.props.inStock - (quantity || 1)

    if (newQuantityInStock < 0) {
      throw new Error('Quantity unavailable in stock.')
    }

    this.props.inStock = newQuantityInStock
    this.touch()
  }
}
