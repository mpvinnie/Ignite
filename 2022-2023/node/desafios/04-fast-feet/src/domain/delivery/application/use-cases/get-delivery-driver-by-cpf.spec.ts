import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
import { InMemoryDeliveryDriversRepository } from '../../../../../test/repositories/in-memory-delivery-drivers.repository'
import { GetDeliveryDriverByCpfUseCase } from './get-delivery-driver-by-cpf'

let deliveryDriversRepository: InMemoryDeliveryDriversRepository
let sut: GetDeliveryDriverByCpfUseCase

describe('Get delivery driver by cpf', () => {
  beforeEach(() => {
    deliveryDriversRepository = new InMemoryDeliveryDriversRepository()
    sut = new GetDeliveryDriverByCpfUseCase(deliveryDriversRepository)
  })

  it('should be able to get a delivery driver by cpf', async () => {
    const deliveryDriver = makeDeliveryDriver()

    deliveryDriversRepository.create(deliveryDriver)

    const result = await sut.execute({
      cpf: deliveryDriver.cpf.toValue()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      deliveryDriver: expect.objectContaining({
        name: deliveryDriver.name
      })
    })
  })
})
