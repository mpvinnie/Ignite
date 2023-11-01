import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Item, ItemProps } from '@/domain/stock/enterprise/entities/item'

import { faker } from '@faker-js/faker'

export function makeItem(override?: Partial<ItemProps>, id?: UniqueEntityId) {
  const item = Item.create(
    {
      productId: new UniqueEntityId(),
      productPrice: Number(faker.commerce.price()),
      quantity: Number(faker.number.int({ min: 1, max: 10 })),
      ...override
    },
    id
  )

  return item
}
