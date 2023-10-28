import { Either, left, right } from '@/core/either'
import { ProductsRepository } from '../repositories/products.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { InvalidStockQuantityError } from './errors/invalid-stock-quantity.error'

interface SetProductMinimumStockQuantityUseCaseRequest {
  productId: string
  minStock: number
}

type SetProductMinimumStockQuantityUseCaseResponse = Either<
  InvalidStockQuantityError | ResourceNotFoundError,
  {}
>

export class SetProductMinimumStockQuantityUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
    minStock
  }: SetProductMinimumStockQuantityUseCaseRequest): Promise<SetProductMinimumStockQuantityUseCaseResponse> {
    if (minStock < 0) {
      return left(new InvalidStockQuantityError())
    }

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    product.minStock = minStock

    await this.productsRepository.save(product)

    return right({})
  }
}
