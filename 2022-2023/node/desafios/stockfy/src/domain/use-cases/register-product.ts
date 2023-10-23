import { Color, Product, Size } from '../entities/product'
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
  }: RegisterProductUseCaseRequest) {
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

    return product
  }
}
