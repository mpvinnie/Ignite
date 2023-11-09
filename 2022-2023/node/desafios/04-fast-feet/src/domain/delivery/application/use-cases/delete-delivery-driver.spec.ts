import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
import { InMemoryDeliveryDriversRepository } from '../../../../../test/repositories/in-memory-delivery-drivers.repository'
import { DeleteDeliveryDriverUseCase } from './delete-delivery-driver'

let deliveryDriversRepository: InMemoryDeliveryDriversRepository
let sut: DeleteDeliveryDriverUseCase

describe('Delete delivery driver', () => {
  beforeEach(() => {
    deliveryDriversRepository = new InMemoryDeliveryDriversRepository()
    sut = new DeleteDeliveryDriverUseCase(deliveryDriversRepository)
  })

  it('should be able to delete a delivery driver', async () => {
    const deliveryDriver = makeDeliveryDriver()

    deliveryDriversRepository.create(deliveryDriver)

    expect(deliveryDriversRepository.items).toHaveLength(1)

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(deliveryDriversRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non-existent delivery driver', async () => {
    const result = await sut.execute({
      deliveryDriverId: 'non-existent-delivery-driver-id'
    })

    expect(result.isLeft()).toBe(true)
  })
})
