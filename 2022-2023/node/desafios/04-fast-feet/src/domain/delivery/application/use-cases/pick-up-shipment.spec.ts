import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryDeliveryDriversRepository } from '../../../../../test/repositories/in-memory-delivery-drivers.repository'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { ShipmentNotAvailableForPickupError } from './errors/shipment-not-available-for-pickup.error'
import { PickUpShipmentUseCase } from './pick-up-shipment'

let recipientsRepository: InMemoryRecipientsRepository
let attachmentsRepository: InMemoryAttachmentsRepository
let deliveryDriversRepository: InMemoryDeliveryDriversRepository
let shipmentsRepository: InMemoryShipmentsRepository
let sut: PickUpShipmentUseCase

describe('Pick up shipment', () => {
  beforeEach(() => {
    recipientsRepository = new InMemoryRecipientsRepository()
    attachmentsRepository = new InMemoryAttachmentsRepository()
    deliveryDriversRepository = new InMemoryDeliveryDriversRepository()
    shipmentsRepository = new InMemoryShipmentsRepository(
      recipientsRepository,
      attachmentsRepository
    )
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
    expect(result.value).toBeInstanceOf(ShipmentNotAvailableForPickupError)
  })
})
