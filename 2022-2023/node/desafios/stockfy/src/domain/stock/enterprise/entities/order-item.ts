import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface OrderItemProps {
  orderId: UniqueEntityId
  itemId: UniqueEntityId
}

export class OrderItem extends Entity<OrderItemProps> {
  static create(props: OrderItemProps, id?: UniqueEntityId) {
    const orderItem = new OrderItem(props, id)

    return orderItem
  }

  get orderId() {
    return this.props.orderId
  }

  get itemId() {
    return this.props.itemId
  }
}
