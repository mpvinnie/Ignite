import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { ShipmentNotInPreparationError } from './errors/shipment-not-in-preparation.error'
import { SetShipmentAvailableForPickup } from './set-shipment-available-for-pickup'

let shipmentsRepository: InMemoryShipmentsRepository
let sut: SetShipmentAvailableForPickup

describe('Set shipment status to available for pickup', () => {
  beforeEach(() => {
    shipmentsRepository = new InMemoryShipmentsRepository()
    sut = new SetShipmentAvailableForPickup(shipmentsRepository)
  })

  it('should be able to set the shipment status to available for pickup', async () => {
    const shipment = makeShipment()

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      shipmentId: shipment.id.toValue()
    })

    expect(result.isRight()).toBe(true)
    expect(shipmentsRepository.items[0]).toMatchObject({
      status: 'AVAILABLE_FOR_PICKUP',
      availableForPickupAt: expect.any(Date)
    })
  })

  it('should be able to set the status of a non-existent shipment', async () => {
    const result = await sut.execute({
      shipmentId: 'non-existent-shipment-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to set the status of a not in preparation shipment', async () => {
    const shipment = makeShipment({
      status: 'DELIVERED'
    })

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      shipmentId: shipment.id.toValue()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotInPreparationError)
  })
})
