import { makeRecipient } from '../../../../../test/factories/make-recipient'
import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { FetchRecipientShipmentsUseCase } from './fetch-recipient-shipments'

let attachmentsRepository: InMemoryAttachmentsRepository
let recipientsRepository: InMemoryRecipientsRepository
let shipmentsRepository: InMemoryShipmentsRepository
let sut: FetchRecipientShipmentsUseCase

describe('Fetch recipient shipments', () => {
  beforeEach(() => {
    attachmentsRepository = new InMemoryAttachmentsRepository()
    recipientsRepository = new InMemoryRecipientsRepository()
    shipmentsRepository = new InMemoryShipmentsRepository(
      recipientsRepository,
      attachmentsRepository
    )
    sut = new FetchRecipientShipmentsUseCase(
      recipientsRepository,
      shipmentsRepository
    )
  })

  it('should be able to fetch recipient shipments', async () => {
    const recipient01 = makeRecipient()
    const recipient02 = makeRecipient()

    const shipment01 = makeShipment({
      recipientId: recipient01.id,
      createdAt: new Date(2023, 10, 25)
    })
    const shipment02 = makeShipment({
      recipientId: recipient01.id,
      createdAt: new Date(2023, 10, 26)
    })
    const shipment03 = makeShipment({
      recipientId: recipient02.id
    })

    recipientsRepository.create(recipient01)
    recipientsRepository.create(recipient02)

    shipmentsRepository.create(shipment01)
    shipmentsRepository.create(shipment02)
    shipmentsRepository.create(shipment03)

    const result = await sut.execute({
      recipmentId: recipient01.id.toValue()
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      shipments: [shipment02, shipment01]
    })
  })

  it('should not be able to fetch shipments of a non-existent recipient', async () => {
    const result = await sut.execute({
      recipmentId: 'non-existent-recipient-id'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
