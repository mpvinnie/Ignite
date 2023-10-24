import { ProductsRepository } from '../repositories/products.repository'

interface SetProductMinimumStockQuantityUseCaseRequest {
  productId: string
  minStock: number
}

type SetProductMinimumStockQuantityUseCaseResponse = void

export class SetProductMinimumStockQuantityUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    productId,
    minStock
  }: SetProductMinimumStockQuantityUseCaseRequest): Promise<SetProductMinimumStockQuantityUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new Error('no product found.')
    }

    product.minStock = minStock

    await this.productsRepository.save(product)
  }
}
