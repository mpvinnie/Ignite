import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { ShipmentNotInTransit } from './errors/shipment-not-in-transit.error'
import { ReturnShipmentUseCase } from './return-shipment'

let attachmentsRepository: InMemoryAttachmentsRepository
let shipmentsRepository: InMemoryShipmentsRepository
let sut: ReturnShipmentUseCase

describe('Return shipment', () => {
  beforeEach(() => {
    attachmentsRepository = new InMemoryAttachmentsRepository()
    shipmentsRepository = new InMemoryShipmentsRepository(attachmentsRepository)
    sut = new ReturnShipmentUseCase(shipmentsRepository)
  })

  it('should be able to return a shipment', async () => {
    const shipment = makeShipment({
      status: 'IN_TRANSIT'
    })

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      shipmentId: shipment.id.toValue()
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to return a non-existent shipment', async () => {
    const result = await sut.execute({
      shipmentId: 'non-existent-shipment-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to return a shipment which is not in transit', async () => {
    const shipment = makeShipment()

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      shipmentId: shipment.id.toValue()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotInTransit)
  })
})
