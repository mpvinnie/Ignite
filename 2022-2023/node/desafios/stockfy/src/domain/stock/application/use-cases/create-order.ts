import { Either, right } from '@/core/either'
import { OrdersRepository } from '../repositories/orders.repository'
import { Order } from '../../enterprise/entities/order'
import { OrderItem } from '../../enterprise/entities/order-item'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface CreateOrderUseCaseRequest {
  itemsAmount: number
  totalAmount: number
  cpf?: string
  itemsIds: string[]
}

type CreateOrderUseCaseResponse = Either<
  null,
  {
    order: Order
  }
>

export class CreateOrderUseCase {
  constructor(private ordersRepository: OrdersRepository) {}

  async execute({
    itemsAmount,
    totalAmount,
    cpf,
    itemsIds
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      itemsAmount,
      totalAmount,
      cpf
    })

    const orderItems = itemsIds.map(itemId => {
      return OrderItem.create({
        orderId: order.id,
        itemId: new UniqueEntityId(itemId)
      })
    })

    order.items = orderItems

    await this.ordersRepository.create(order)

    return right({
      order
    })
  }
}
