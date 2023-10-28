import { Either, right } from '@/core/either'
import { Color, Product, Size } from '../../enterprise/entities/product'
import { ProductsRepository } from '../repositories/products.repository'

interface RegisterProductUseCaseRequest {
  name: string
  price: number
  description?: string | null
  size?: Size | null
  color?: Color | null
  inStock: number
  minStock: number
}

type RegisterProductUseCaseResponse = Either<
  null,
  {
    product: Product
  }
>

export class RegisterProductUseCase {
  constructor(private productsRepository: ProductsRepository) {}

  async execute({
    name,
    price,
    description,
    size,
    color,
    inStock,
    minStock
  }: RegisterProductUseCaseRequest): Promise<RegisterProductUseCaseResponse> {
    const product = Product.create({
      name,
      price,
      description,
      size,
      color,
      inStock,
      minStock
    })

    await this.productsRepository.create(product)

    return right({
      product
    })
  }
}
