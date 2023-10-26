import { ProductsRepository } from '../repositories/products.repository'

interface SetProductMinimumStockQuantityUseCaseRequest {
  productId: string
  minStock: number
}

interface SetProductMinimumStockQuantityUseCaseResponse {}

export class SetProductMinimumStockQuantityUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
    minStock
  }: SetProductMinimumStockQuantityUseCaseRequest): Promise<SetProductMinimumStockQuantityUseCaseResponse> {
    if (minStock < 0) {
      throw new Error('minimum stock quantity cannot be less than 0')
    }

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('no product found.')
    }

    product.minStock = minStock

    await this.productsRepository.save(product)

    return {}
  }
}
