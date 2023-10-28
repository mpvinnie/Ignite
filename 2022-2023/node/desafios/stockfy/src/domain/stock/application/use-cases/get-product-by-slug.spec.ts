import { makeProduct } from '../../../../../test/factories/make-product'
import { InMemoryProductsRepository } from '../../../../../test/repositories/in-memory-products.repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetProductBySlugUseCase } from './get-product-by-slug'

let productsRepository: InMemoryProductsRepository
let sut: GetProductBySlugUseCase

describe('Get product by slug', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new GetProductBySlugUseCase(productsRepository)
  })

  it('should be able to get a product by its slug', async () => {
    const newProduct = makeProduct({
      slug: Slug.create('product-a')
    })

    await productsRepository.create(newProduct)

    const result = await sut.execute({
      slug: 'product-a'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      product: expect.objectContaining({
        name: newProduct.name
      })
    })
  })
})
