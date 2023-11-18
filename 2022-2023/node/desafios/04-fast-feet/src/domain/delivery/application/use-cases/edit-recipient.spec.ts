import { makeRecipient } from '../../../../../test/factories/make-recipient'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { EditRecipientUseCase } from './edit-recipient'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

let recipientsRepository: InMemoryRecipientsRepository
let sut: EditRecipientUseCase

describe('Edit recipient', () => {
  beforeEach(() => {
    recipientsRepository = new InMemoryRecipientsRepository()
    sut = new EditRecipientUseCase(recipientsRepository)
  })

  it('should be able to edit a recipient', async () => {
    const recipient = makeRecipient()

    recipientsRepository.create(recipient)

    const result = await sut.execute({
      recipientId: recipient.id.toValue(),
      name: 'John Doe Up',
      phone: '55999999999',
      streetNumber: recipient.streetNumber,
      street: recipient.street,
      neighborhood: recipient.neighborhood,
      city: recipient.city,
      state: recipient.state,
      zipCode: recipient.zipCode,
      country: recipient.country,
      complement: recipient.complement,
      latitude: recipient.latitude,
      longitude: recipient.longitude
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      recipient: expect.objectContaining({
        name: 'John Doe Up',
        phone: '55999999999'
      })
    })
  })

  it('should not be able to edit a non-existent recipient', async () => {
    const recipient = makeRecipient()

    const result = await sut.execute({
      recipientId: 'non-existent-recipient-id',
      name: 'John Doe Up',
      phone: '55999999999',
      streetNumber: recipient.streetNumber,
      street: recipient.street,
      neighborhood: recipient.neighborhood,
      city: recipient.city,
      state: recipient.state,
      zipCode: recipient.zipCode,
      country: recipient.country,
      complement: recipient.complement,
      latitude: recipient.latitude,
      longitude: recipient.longitude
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
