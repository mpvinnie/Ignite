import { Either, left, right } from '@/core/either'
import { Product } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

interface GetProductBySlugUseCaseRequest {
  slug: string
}

type GetProductBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    product: Product
  }
>

export class GetProductBySlugUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    slug
  }: GetProductBySlugUseCaseRequest): Promise<GetProductBySlugUseCaseResponse> {
    const product = await this.productsRepository.findBySlug(slug)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    return right({
      product
    })
  }
}
