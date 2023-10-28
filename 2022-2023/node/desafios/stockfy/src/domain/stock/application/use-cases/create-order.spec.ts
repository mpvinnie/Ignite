import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryOrdersRepository } from '../../../../../test/repositories/in-memory-orders.repository'
import { CreateOrderUseCase } from './create-order'

let ordersRepository: InMemoryOrdersRepository
let sut: CreateOrderUseCase

describe('Create order', () => {
  beforeEach(() => {
    ordersRepository = new InMemoryOrdersRepository()
    sut = new CreateOrderUseCase(ordersRepository)
  })

  it('should be able to create a order', async () => {
    const result = await sut.execute({
      itemsAmount: 2,
      totalAmount: 10,
      cpf: '00000000000',
      itemsIds: ['1', '2']
    })

    expect(result.isRight()).toBe(true)
    expect(ordersRepository.items[0]).toEqual(result.value?.order)
    expect(ordersRepository.items[0].items).toHaveLength(2)
    expect(ordersRepository.items[0].items).toEqual([
      expect.objectContaining({
        itemId: new UniqueEntityId('1')
      }),
      expect.objectContaining({
        itemId: new UniqueEntityId('2')
      })
    ])
  })
})
