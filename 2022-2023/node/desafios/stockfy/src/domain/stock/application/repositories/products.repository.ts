import { Product } from '../../enterprise/entities/product'

export interface ProductsRepository {
  findById(id: string): Promise<Product | null>
  findBySlug(slug: string): Promise<Product | null>
  create(product: Product): Promise<void>
  save(product: Product): Promise<void>
}
