import { FakeHasher } from '../../../../../test/cryptography/fake-hasher'
import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
import { InMemoryDeliveryDriversRepository } from '../../../../../test/repositories/in-memory-delivery-drivers.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { UpdateDeliveryDriverPasswordUseCase } from './update-delivery-driver-password'

let deliveryDriversRepository: InMemoryDeliveryDriversRepository
let hasher: FakeHasher
let sut: UpdateDeliveryDriverPasswordUseCase

describe('Update delivery driver password', () => {
  beforeEach(() => {
    deliveryDriversRepository = new InMemoryDeliveryDriversRepository()
    hasher = new FakeHasher()
    sut = new UpdateDeliveryDriverPasswordUseCase(
      deliveryDriversRepository,
      hasher
    )
  })

  it('should be able to update the delivery driver password', async () => {
    const deliveryDriver = makeDeliveryDriver()

    deliveryDriversRepository.create(deliveryDriver)

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toValue(),
      password: 'new-password'
    })

    const hasehdPassword = await hasher.hash('new-password')

    expect(result.isRight()).toBe(true)
    expect(deliveryDriversRepository.items[0].password).toEqual(hasehdPassword)
  })

  it('should not be able to update the password of non-existent delivery driver', async () => {
    const result = await sut.execute({
      deliveryDriverId: 'non-existent-delivery-driver-id',
      password: 'new-password'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
