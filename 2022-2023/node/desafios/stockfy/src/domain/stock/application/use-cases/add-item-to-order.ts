import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { ItemsRepository } from '../repositories/items.repository'
import { ProductsRepository } from '../repositories/products.repository'
import { Item } from '../../enterprise/entities/item'
import { OutOfStockError } from './errors/out-of-stock.error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface AddItemToOrderUseCaseRequest {
  itemId?: string
  productId: string
  quantity?: number
}

type AddItemToOrderUseCaseResponse = Either<
  ResourceNotFoundError | OutOfStockError,
  {
    itemId: string
  }
>

export class AddItemToOrderUseCase {
  constructor(
    private productsRepository: ProductsRepository,
    private itemsRepository: ItemsRepository
  ) {}

  async execute({
    itemId,
    productId,
    quantity
  }: AddItemToOrderUseCaseRequest): Promise<AddItemToOrderUseCaseResponse> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      return left(new ResourceNotFoundError())
    }

    if (product.inStock === 0) {
      return left(new OutOfStockError())
    }

    if (itemId) {
      const item = await this.itemsRepository.findById(itemId)

      if (!item) {
        return left(new ResourceNotFoundError())
      }

      product.decreaseInStock(quantity)
      item.increaseQuantity(quantity)
      item.updateAmount()

      await Promise.all([
        this.productsRepository.save(product),
        this.itemsRepository.save(item)
      ])

      return right({ itemId })
    }

    const item = Item.create({
      productId: new UniqueEntityId(productId),
      productPrice: product.price,
      quantity: quantity ?? 1
    })

    product.decreaseInStock(quantity)

    await Promise.all([
      this.productsRepository.save(product),
      this.itemsRepository.create(item)
    ])

    return right({ itemId: item.id.toString() })
  }
}
