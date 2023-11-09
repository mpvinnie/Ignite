import { FakeHasher } from '../../../../../test/cryptography/fake-hasher'
import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
import { InMemoryDeliveryDriversRepository } from '../../../../../test/repositories/in-memory-delivery-drivers.repository'
import { EditDeliveryDriverUseCase } from './edit-delivery-driver'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

let deliveryDriversRepository: InMemoryDeliveryDriversRepository
let hasher: FakeHasher
let sut: EditDeliveryDriverUseCase

describe('Edit delivery driver', () => {
  beforeEach(() => {
    deliveryDriversRepository = new InMemoryDeliveryDriversRepository()
    hasher = new FakeHasher()
    sut = new EditDeliveryDriverUseCase(deliveryDriversRepository, hasher)
  })

  it('should be able to edit a delivery driver', async () => {
    const deliveryDriver = makeDeliveryDriver()

    deliveryDriversRepository.create(deliveryDriver)

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toString(),
      name: 'John Doe',
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    expect(deliveryDriversRepository.items[0]).toEqual(
      expect.objectContaining({
        name: 'John Doe'
      })
    )
  })

  it('should not be able to edit a non-existent delivery driver', async () => {
    const result = await sut.execute({
      deliveryDriverId: 'non-existent-delivery-driver-id',
      name: 'John Doe'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should hash the password when editing delivery driver', async () => {
    const deliveryDriver = makeDeliveryDriver()

    deliveryDriversRepository.create(deliveryDriver)

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toString(),
      name: 'John Doe',
      password: '123456'
    })

    const hashedPassword = await hasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(deliveryDriversRepository.items[0].password).toEqual(hashedPassword)
  })
})
