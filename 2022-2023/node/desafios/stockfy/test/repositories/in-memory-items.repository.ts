import { ItemsRepository } from '@/domain/stock/application/repositories/items.repository'
import { Item } from '@/domain/stock/enterprise/entities/item'

export class InMemoryItemsRepository implements ItemsRepository {
  public items: Item[] = []

  async findById(id: string) {
    const item = this.items.find(item => item.id.toString() === id)

    if (!item) {
      return null
    }

    return item
  }

  async create(item: Item) {
    this.items.push(item)
  }

  async save(item: Item) {
    const itemIndex = this.items.findIndex(item => item.id === item.id)

    this.items[itemIndex] = item
  }
}
