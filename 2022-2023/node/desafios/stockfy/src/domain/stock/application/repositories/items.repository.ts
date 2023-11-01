import { Item } from '../../enterprise/entities/item'

export interface ItemsRepository {
  findById(id: string): Promise<Item | null>
  findManyByIds(ids: string[]): Promise<Item[]>
  create(item: Item): Promise<void>
  save(item: Item): Promise<void>
  delete(item: Item): Promise<void>
}
