import { Item } from '../../enterprise/entities/item'

export interface ItemsRepository {
  findById(id: string): Promise<Item | null>
  create(item: Item): Promise<void>
  save(item: Item): Promise<void>
}
