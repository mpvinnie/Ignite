import { Either, left, right } from '@/core/either'
import { ItemsRepository } from '../repositories/items.repository'
import { ProductsRepository } from '../repositories/products.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

interface RemoveOrderItemsUseCaseRequest {
  itemsIds: string[]
}

type RemoveOrderItemsUseCaseResponse = Either<ResourceNotFoundError, {}>

export class RemoveOrderItemsUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private itemsRepository: ItemsRepository
  ) {}

  async execute({
    itemsIds
  }: RemoveOrderItemsUseCaseRequest): Promise<RemoveOrderItemsUseCaseResponse> {
    const items = await this.itemsRepository.findManyByIds(itemsIds)

    if (items.length === 0) {
      return left(new ResourceNotFoundError())
    }

    items.forEach(async item => {
      const product = await this.productsRepository.findById(
        item.productId.toString()
      )

      if (!product) {
        return
      }

      product.increaseInStock(item.quantity)

      await Promise.all([
        this.itemsRepository.delete(item),
        this.productsRepository.save(product)
      ])
    })

    return right({})
  }
}
