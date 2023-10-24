import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'

interface GetProductBySlugUseCaseRequest {
  slug: string
}

interface GetProductBySlugUseCaseResponse {
  product: Product
}

export class GetProductBySlugUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    slug
  }: GetProductBySlugUseCaseRequest): Promise<GetProductBySlugUseCaseResponse> {
    const product = await this.productsRepository.findBySlug(slug)

    if (!product) {
      throw new Error('No product found.')
    }

    return {
      product
    }
  }
}
