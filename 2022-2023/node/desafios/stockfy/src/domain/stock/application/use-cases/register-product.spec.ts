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
    const { product } = await sut.execute({
      name: 'Product A',
      price: 1000,
      size: 'big',
      color: 'red',
      inStock: 1000,
      minStock: 50
    })

    expect(product.id).toBeTruthy()
    expect(productsRepository.items[0].id).toEqual(product.id)
  })
})
