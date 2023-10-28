import { Either, right } from '@/core/either'
import { Color, Product, Size } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'

interface FetchProductsUseCaseRequest {
  page: number
  name?: string
  size?: Size
  color?: Color
}

type FetchProductsUseCaseResponse = Either<
  null,
  {
    products: Product[]
  }
>

export class FetchProductsUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    page,
    name,
    size,
    color
  }: FetchProductsUseCaseRequest): Promise<FetchProductsUseCaseResponse> {
    const products = await this.productsRepository.findManyByFilters({
      page,
      name,
      size,
      color
    })

    return right({
      products
    })
  }
}
