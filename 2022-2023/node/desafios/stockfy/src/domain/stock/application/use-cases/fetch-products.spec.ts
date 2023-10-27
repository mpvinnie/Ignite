import { makeProduct } from '../../../../../test/factories/make-product'
import { InMemoryProductsRepository } from '../../../../../test/repositories/in-memory-products.repository'
import { FetchProductsUseCase } from './fetch-products'

let productsRepository: InMemoryProductsRepository
let sut: FetchProductsUseCase

describe('Fetch products', () => {
  beforeEach(() => {
    productsRepository = new InMemoryProductsRepository()
    sut = new FetchProductsUseCase(productsRepository)
  })

  it('should be able to fetch products', async () => {
    await productsRepository.create(
      makeProduct({
        name: 'Keyboard'
      })
    )
    await productsRepository.create(
      makeProduct({
        name: 'Mouse'
      })
    )
    await productsRepository.create(
      makeProduct({
        name: 'Computer'
      })
    )

    const { products } = await sut.execute({
      page: 1
    })

    expect(products).toEqual([
      expect.objectContaining({
        name: 'Computer'
      }),
      expect.objectContaining({
        name: 'Keyboard'
      }),
      expect.objectContaining({
        name: 'Mouse'
      })
    ])
  })

  it('should be able to fetch paginated products', async () => {
    for (let i = 1; i <= 22; i++) {
      await productsRepository.create(makeProduct())
    }

    const { products } = await sut.execute({
      page: 2
    })

    expect(products).toHaveLength(2)
  })

  it('should be able to fetch filtered products', async () => {
    await productsRepository.create(
      makeProduct({
        name: 'Keyboard',
        color: 'red'
      })
    )

    await productsRepository.create(
      makeProduct({
        name: 'Mechanical Keyboard',
        color: 'blue'
      })
    )

    await productsRepository.create(
      makeProduct({
        name: 'Mechanical Keyboard',
        color: 'red'
      })
    )

    await productsRepository.create(
      makeProduct({
        name: 'Mouse'
      })
    )

    const { products } = await sut.execute({
      page: 1,
      name: 'Keyboard',
      color: 'red'
    })

    expect(products).toEqual([
      expect.objectContaining({
        name: 'Keyboard'
      }),
      expect.objectContaining({
        name: 'Mechanical Keyboard'
      })
    ])
  })
})
