import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { OrderItem } from './order-item'
import { Optional } from '@/core/types/optional'

export interface OrderProps {
  itemsAmount: number
  totalAmount: number
  cpf?: string
  items: OrderItem[]
  createdAt: Date
}

export class Order extends AggregateRoot<OrderProps> {
  static create(
    props: Optional<OrderProps, 'items' | 'createdAt'>,
    id?: UniqueEntityId
  ) {
    const order = new Order(
      {
        ...props,
        items: props.items ?? [],
        createdAt: props.createdAt ?? new Date()
      },
      id
    )

    return order
  }

  get itemsAmount() {
    return this.props.itemsAmount
  }

  get totalAmount() {
    return this.props.totalAmount
  }

  get cpf() {
    return this.props.cpf
  }

  get items() {
    return this.props.items
  }

  set items(items: OrderItem[]) {
    this.props.items = items
  }

  get createdAt() {
    return this.props.createdAt
  }
}
