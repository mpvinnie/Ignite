import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { GetShipmentByIdUseCase } from './get-shipment-by-id'

let recipientsRepository: InMemoryRecipientsRepository
let attachmentsRepository: InMemoryAttachmentsRepository
let shipmentsRepository: InMemoryShipmentsRepository
let sut: GetShipmentByIdUseCase

describe('Get shipment by id', () => {
  beforeEach(() => {
    recipientsRepository = new InMemoryRecipientsRepository()
    attachmentsRepository = new InMemoryAttachmentsRepository()
    shipmentsRepository = new InMemoryShipmentsRepository(
      recipientsRepository,
      attachmentsRepository
    )
    sut = new GetShipmentByIdUseCase(shipmentsRepository)
  })

  it('should be able to get a shipment by id', async () => {
    const shipment = makeShipment()

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      shipmentId: shipment.id.toValue()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      shipment: expect.objectContaining({
        id: shipment.id
      })
    })
  })

  it('should not be able to get a non-existent shipment', async () => {
    const result = await sut.execute({
      shipmentId: 'non-existent-shipment-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
