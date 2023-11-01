import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface ItemProps {
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

  increaseQuantity(quantity?: number) {
    if (quantity && quantity <= 0) {
      throw new Error('Quantity to increase cannot be less or equal than 0.')
    }

    this.props.quantity = this.props.quantity + (quantity || 1)
  }

  updateAmount() {
    this.props.amount = this.props.productPrice * this.props.quantity
  }
}
