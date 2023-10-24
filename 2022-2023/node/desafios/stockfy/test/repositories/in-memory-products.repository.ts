import { ProductsRepository } from '@/domain/stock/application/repositories/products.repository'
import { Product } from '@/domain/stock/enterprise/entities/product'

export class InMemoryProductsRepository implements ProductsRepository {
  public items: Product[] = []

  async findById(id: string) {
    const product = this.items.find(product => product.id.toString() === id)

    if (!product) {
      return null
    }

    return product
  }

  async findBySlug(slug: string) {
    const product = this.items.find(product => product.slug.value === slug)

    if (!product) {
      return null
    }

    return product
  }

  async create(product: Product) {
    this.items.push(product)
  }

  async save(product: Product) {
    const productIndex = this.items.findIndex(
      productIndex => productIndex.id === product.id
    )

    this.items[productIndex] = product
  }
}
