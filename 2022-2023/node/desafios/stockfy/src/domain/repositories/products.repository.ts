import { Product } from '../entities/product'

export interface ProductsRepository {
  create(product: Product): Promise<void>
}
