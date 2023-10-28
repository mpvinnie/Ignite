import { RegisterProductUseCase } from './register-product'
import { InMemoryProductsRepository } from '../../../../../test/repositories/in-memory-products.repository'

let productsRepository: InMemoryProductsRepository
let sut: RegisterProductUseCase

describe('Register product', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new RegisterProductUseCase(productsRepository)
  })

  it('should be able to register a product', async () => {
    const result = await sut.execute({
      name: 'Product A',
      price: 1000,
      size: 'big',
      color: 'red',
      inStock: 1000,
      minStock: 50
    })

    expect(result.isRight()).toBe(true)
    expect(productsRepository.items[0]).toEqual(result.value?.product)
  })
})
