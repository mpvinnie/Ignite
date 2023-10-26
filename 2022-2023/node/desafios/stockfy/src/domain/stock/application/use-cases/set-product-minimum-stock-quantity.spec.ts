import { makeProduct } from '../../../../../test/factories/make-product'
import { InMemoryProductsRepository } from '../../../../../test/repositories/in-memory-products.repository'
import { SetProductMinimumStockQuantityUseCase } from './set-product-minimum-stock-quantity'

let productsRepository: InMemoryProductsRepository
let sut: SetProductMinimumStockQuantityUseCase

describe('Set product minimum stock quantity', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new SetProductMinimumStockQuantityUseCase(productsRepository)
  })

  it('should be able to set a minimum stock quantity to a product', async () => {
    const product = makeProduct({
      minStock: 30
    })

    productsRepository.create(product)

    await sut.execute({
      productId: product.id.toString(),
      minStock: 20
    })

    expect(productsRepository.items[0].id).toEqual(product.id)
    expect(productsRepository.items[0].minStock).toEqual(20)
  })

  it('should not be able to set a minimum stock quantity less than 0', async () => {
    const product = makeProduct({
      minStock: 30
    })

    productsRepository.create(product)

    expect(() => {
      return sut.execute({
        productId: product.id.toString(),
        minStock: -1
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
