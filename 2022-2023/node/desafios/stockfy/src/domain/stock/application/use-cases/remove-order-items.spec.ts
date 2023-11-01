import { makeItem } from '../../../../../test/factories/make-item'
import { makeProduct } from '../../../../../test/factories/make-product'
import { InMemoryItemsRepository } from '../../../../../test/repositories/in-memory-items.repository'
import { InMemoryProductsRepository } from '../../../../../test/repositories/in-memory-products.repository'
import { RemoveOrderItemsUseCase } from './remove-order-items'

let productsRepository: InMemoryProductsRepository
let itemsRepository: InMemoryItemsRepository
let sut: RemoveOrderItemsUseCase

describe('Remove order items', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    itemsRepository = new InMemoryItemsRepository()
    sut = new RemoveOrderItemsUseCase(productsRepository, itemsRepository)
  })

  it('shoud be able to remove order items', async () => {
    const product = makeProduct({
      inStock: 8
    })

    const item = makeItem({
      productId: product.id,
      quantity: 2
    })

    productsRepository.items.push(product)
    itemsRepository.items.push(item)

    const result = await sut.execute({
      itemsIds: [item.id.toString()]
    })

    expect(result.isRight()).toBe(true)
    expect(itemsRepository.items.length).toEqual(0)
    expect(productsRepository.items[0].inStock).toEqual(10)
  })

  it('shoud not be able to remove an non-existent order item', async () => {
    const result = await sut.execute({
      itemsIds: ['non-existent-item-id']
    })

    expect(result.isLeft()).toBe(true)
  })
})
