import { makeRecipient } from '../../../../../test/factories/make-recipient'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { RegisterShipmentUseCase } from './register-shipment'

let attachmentsRepository: InMemoryAttachmentsRepository
let recipientsRepository: InMemoryRecipientsRepository
let shipmentsRepository: InMemoryShipmentsRepository
let sut: RegisterShipmentUseCase

describe('Register shipment', () => {
  beforeEach(() => {
    attachmentsRepository = new InMemoryAttachmentsRepository()
    recipientsRepository = new InMemoryRecipientsRepository()
    shipmentsRepository = new InMemoryShipmentsRepository(attachmentsRepository)
    sut = new RegisterShipmentUseCase(recipientsRepository, shipmentsRepository)
  })

  it('should be able to register a shipment', async () => {
    const recipient = makeRecipient()
    recipientsRepository.create(recipient)

    const result = await sut.execute({
      recipientId: recipient.id.toValue(),
      weightInGrams: 2000
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      shipment: shipmentsRepository.items[0]
    })
  })

  it('should not be able to register a shipment to a non-existent recipient', async () => {
    const result = await sut.execute({
      recipientId: 'non-existent-recipient-id',
      weightInGrams: 2000
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
