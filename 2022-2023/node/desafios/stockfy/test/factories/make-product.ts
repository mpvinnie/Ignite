import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Product,
  ProductProps
} from '@/domain/stock/enterprise/entities/product'
import { faker } from '@faker-js/faker'

export function makeProduct(
  override?: Partial<ProductProps>,
  id?: UniqueEntityId
) {
  const product = Product.create(
    {
      name: faker.commerce.productName(),
      price: Number(faker.commerce.price()),
      description: faker.commerce.productDescription(),
      inStock: faker.number.int({ max: 1000, min: 30 }),
      minStock: 30,
      ...override
    },
    id
  )

  return product
}
