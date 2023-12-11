import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { DeleteShipmentUseCase } from './delete-shipment'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { NotAllowedError } from './errors/not-allowed.error'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'

let recipientsRepository: InMemoryRecipientsRepository
let attachmentsRepository: InMemoryAttachmentsRepository
let shipmentsRepository: InMemoryShipmentsRepository
let sut: DeleteShipmentUseCase

describe('Delete shipment', () => {
  beforeEach(() => {
    recipientsRepository = new InMemoryRecipientsRepository()
    attachmentsRepository = new InMemoryAttachmentsRepository()
    shipmentsRepository = new InMemoryShipmentsRepository(
      recipientsRepository,
      attachmentsRepository
    )
    sut = new DeleteShipmentUseCase(shipmentsRepository)
  })

  it('should be able to delete a shipment', async () => {
    const shipment = makeShipment()

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      shipmentId: shipment.id.toValue()
    })

    expect(result.isRight()).toBe(true)
    expect(shipmentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non-existent shipment', async () => {
    const result = await sut.execute({
      shipmentId: 'non-existent-shipment-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete a shipment which has not been delivered yet by the delivery driver', async () => {
    const shipment = makeShipment({
      deliveryDriverId: new UniqueEntityId(),
      inTransitAt: new Date()
    })

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      shipmentId: shipment.id.toValue()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should be able to delete a shipment which has been already delivered', async () => {
    const shipment = makeShipment({
      deliveryDriverId: new UniqueEntityId(),
      deliveredAt: new Date()
    })

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      shipmentId: shipment.id.toValue()
    })

    expect(result.isRight()).toBe(true)
    expect(shipmentsRepository.items).toHaveLength(0)
  })
})
