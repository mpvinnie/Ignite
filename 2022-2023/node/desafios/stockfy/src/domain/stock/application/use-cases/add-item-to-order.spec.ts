import { makeProduct } from '../../../../../test/factories/make-product'
import { InMemoryItemsRepository } from '../../../../../test/repositories/in-memory-items.repository'
import { InMemoryProductsRepository } from '../../../../../test/repositories/in-memory-products.repository'
import { AddItemToOrderUseCase } from './add-item-to-order'
import { OutOfStockError } from './errors/out-of-stock.error'

let productsRepository: InMemoryProductsRepository
let itemsRepository: InMemoryItemsRepository
let sut: AddItemToOrderUseCase

describe('Add item to order', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    itemsRepository = new InMemoryItemsRepository()
    sut = new AddItemToOrderUseCase(productsRepository, itemsRepository)
  })

  it('should be able to add a new item to order list', async () => {
    const product = makeProduct({
      inStock: 5
    })
    productsRepository.create(product)

    const result = await sut.execute({
      productId: product.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      itemId: expect.any(String)
    })
    expect(itemsRepository.items[0]).toEqual(
      expect.objectContaining({
        productId: product.id
      })
    )
    expect(productsRepository.items[0].inStock).toBe(4)
  })

  it('should be not able to add an out of stock item to order list', async () => {
    const product = makeProduct({
      inStock: 0
    })
    productsRepository.create(product)

    const result = await sut.execute({
      productId: product.id.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(OutOfStockError)
  })

  it('should be able to add a already added item to order list', async () => {
    const product = makeProduct({
      inStock: 5
    })
    productsRepository.create(product)

    await sut.execute({
      productId: product.id.toString()
    })

    const addedItem = itemsRepository.items[0]

    const result = await sut.execute({
      itemId: addedItem.id.toString(),
      productId: product.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      itemId: addedItem.id.toString()
    })
    expect(itemsRepository.items).toHaveLength(1)
    expect(productsRepository.items[0].inStock).toBe(3)
  })

  it('should be able to add a new item quantity to order list', async () => {
    const product = makeProduct({
      inStock: 5
    })
    productsRepository.create(product)

    const result = await sut.execute({
      productId: product.id.toString(),
      quantity: 5
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      itemId: expect.any(String)
    })
    expect(itemsRepository.items[0]).toEqual(
      expect.objectContaining({
        productId: product.id
      })
    )
    expect(productsRepository.items[0].inStock).toBe(0)
  })
})
