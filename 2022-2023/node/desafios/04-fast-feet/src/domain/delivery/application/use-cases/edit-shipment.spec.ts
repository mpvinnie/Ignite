import { makeRecipient } from '../../../../../test/factories/make-recipient'
import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { EditShipmentUseCase } from './edit-shipment'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

let attachmentsRepository: InMemoryAttachmentsRepository
let recipientsRepository: InMemoryRecipientsRepository
let shipmentsRepository: InMemoryShipmentsRepository
let sut: EditShipmentUseCase

describe('Edit shipment', () => {
  beforeEach(() => {
    attachmentsRepository = new InMemoryAttachmentsRepository()
    recipientsRepository = new InMemoryRecipientsRepository()
    shipmentsRepository = new InMemoryShipmentsRepository(
      recipientsRepository,
      attachmentsRepository
    )
    sut = new EditShipmentUseCase(recipientsRepository, shipmentsRepository)
  })

  it('should be able to edit a shipment', async () => {
    const shipment = makeShipment()
    const anotherRecipient = makeRecipient()

    shipmentsRepository.create(shipment)
    recipientsRepository.create(anotherRecipient)

    const result = await sut.execute({
      shipmentId: shipment.id.toValue(),
      recipientId: anotherRecipient.id.toValue(),
      weightInGrams: 500
    })

    expect(result.isRight()).toBe(true)
    expect(shipmentsRepository.items[0]).toEqual(
      expect.objectContaining({
        recipientId: anotherRecipient.id,
        weightInGrams: 500
      })
    )
  })

  it('should not be able to edit a non-existent shipment', async () => {
    const anotherRecipient = makeRecipient()

    recipientsRepository.create(anotherRecipient)

    const result = await sut.execute({
      shipmentId: 'non-existent-shipment-id',
      recipientId: anotherRecipient.id.toValue(),
      weightInGrams: 500
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should be able to edit a non-existent recipient of a shipment', async () => {
    const shipment = makeShipment()

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      shipmentId: shipment.id.toValue(),
      recipientId: 'non-existent-recipient-id',
      weightInGrams: 500
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
