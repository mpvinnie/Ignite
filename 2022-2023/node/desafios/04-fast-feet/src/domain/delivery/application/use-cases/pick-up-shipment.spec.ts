import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryDeliveryDriversRepository } from '../../../../../test/repositories/in-memory-delivery-drivers.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { ShipmentNotAvailableForPickup } from './errors/shipment-not-available-for-pickup'
import { PickUpShipmentUseCase } from './pick-up-shipment'

let deliveryDriversRepository: InMemoryDeliveryDriversRepository
let shipmentsRepository: InMemoryShipmentsRepository
let sut: PickUpShipmentUseCase

describe('Pick up shipment', () => {
  beforeEach(() => {
    deliveryDriversRepository = new InMemoryDeliveryDriversRepository()
    shipmentsRepository = new InMemoryShipmentsRepository()
    sut = new PickUpShipmentUseCase(
      deliveryDriversRepository,
      shipmentsRepository
    )
  })

  it('should be able to pick up a shipment', async () => {
    const deliveryDriver = makeDeliveryDriver()
    const shipment = makeShipment({
      status: 'AVAILABLE_FOR_PICKUP',
      availableForPickupAt: new Date()
    })

    deliveryDriversRepository.create(deliveryDriver)
    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toValue(),
      shipmentId: shipment.id.toValue()
    })

    expect(result.isRight()).toBe(true)
    expect(shipmentsRepository.items[0]).toMatchObject({
      deliveryDriverId: deliveryDriver.id,
      status: 'IN_TRANSIT',
      inTransitAt: expect.any(Date)
    })
  })

  it('should be able a non-existent delivery pick up a shipment', async () => {
    const shipment = makeShipment({
      status: 'AVAILABLE_FOR_PICKUP',
      availableForPickupAt: new Date()
    })

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      deliveryDriverId: 'non-existent-delivery-driver-id',
      shipmentId: shipment.id.toValue()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to pick up a non-existent shipment', async () => {
    const deliveryDriver = makeDeliveryDriver()

    deliveryDriversRepository.create(deliveryDriver)

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toValue(),
      shipmentId: 'non-existent-shipment-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to pick up a shipment which is not available for pickup', async () => {
    const deliveryDriver = makeDeliveryDriver()
    const shipment = makeShipment()

    deliveryDriversRepository.create(deliveryDriver)
    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toValue(),
      shipmentId: shipment.id.toValue()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotAvailableForPickup)
  })
})
