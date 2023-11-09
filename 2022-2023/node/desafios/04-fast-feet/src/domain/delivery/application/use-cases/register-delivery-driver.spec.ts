import { FakeHasher } from '../../../../../test/cryptography/fake-hasher'
import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
import { InMemoryDeliveryDriversRepository } from '../../../../../test/repositories/in-memory-delivery-drivers.repository'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { DuplicatedResourceError } from './errors/duplicated-resource.error'
import { RegisterDeliveryDriverUseCase } from './register-delivery-driver'

let deliveryDriversRepository: InMemoryDeliveryDriversRepository
let hasher: FakeHasher
let sut: RegisterDeliveryDriverUseCase

describe('Register delivery driver', () => {
  beforeEach(() => {
    deliveryDriversRepository = new InMemoryDeliveryDriversRepository()
    hasher = new FakeHasher()
    sut = new RegisterDeliveryDriverUseCase(deliveryDriversRepository, hasher)
  })

  it('should be able to register a delivery driver', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: Cpf.generate().toValue(),
      password: '123456'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      deliveryDriver: deliveryDriversRepository.items[0]
    })
  })

  it('should hash delivery driver password upon registration', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      cpf: Cpf.generate().toValue(),
      password: '123456'
    })

    const hashedPassword = await hasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(deliveryDriversRepository.items[0].password).toEqual(hashedPassword)
  })

  it('should not be able to register a delivery driver with same cpf', async () => {
    const deliveryDriver = makeDeliveryDriver()

    deliveryDriversRepository.create(deliveryDriver)

    const result = await sut.execute({
      name: 'John Doe',
      cpf: deliveryDriver.cpf.toValue(),
      password: '123456'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(DuplicatedResourceError)
  })
})
