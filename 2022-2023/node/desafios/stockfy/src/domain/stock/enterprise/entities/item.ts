import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

interface ItemProps {
  productId: UniqueEntityId
  productPrice: number
  quantity: number
  amount: number
}

export class Item extends Entity<ItemProps> {
  static create(props: Optional<ItemProps, 'amount'>, id?: UniqueEntityId) {
    const item = new Item(
      {
        ...props,
        amount: props.amount ?? props.productPrice * props.quantity
      },
      id
    )

    return item
  }

  get productId() {
    return this.props.productId
  }

  get productPrice() {
    return this.props.productPrice
  }

  get quantity() {
    return this.props.quantity
  }

  get amount() {
    return this.props.amount
  }
}
