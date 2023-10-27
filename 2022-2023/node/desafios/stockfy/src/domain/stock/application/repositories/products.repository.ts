import { PaginationParams } from '@/core/repositories/pagination-params'
import { Color, Product, Size } from '../../enterprise/entities/product'

export interface ProductFilters {
  name?: string
  size?: Size
  color?: Color
}

export interface ProductsRepository {
  findById(id: string): Promise<Product | null>
  findBySlug(slug: string): Promise<Product | null>
  findManyByFilters(
    params: PaginationParams & ProductFilters
  ): Promise<Product[]>
  create(product: Product): Promise<void>
  save(product: Product): Promise<void>
}
