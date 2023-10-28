import { OrdersRepository } from '@/domain/stock/application/repositories/orders.repository'
import { Order } from '@/domain/stock/enterprise/entities/order'

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = []

  async create(order: Order) {
    this.items.push(order)
  }
}
