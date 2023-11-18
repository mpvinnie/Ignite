import { makeRecipient } from '../../../../../test/factories/make-recipient'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { DeleteRecipientUseCase } from './delete-recipient'

let recipientsRepository: InMemoryRecipientsRepository
let sut: DeleteRecipientUseCase

describe('Delete recipient', () => {
  beforeEach(() => {
    recipientsRepository = new InMemoryRecipientsRepository()
    sut = new DeleteRecipientUseCase(recipientsRepository)
  })

  it('should be able to delete a recipient', async () => {
    const recipient = makeRecipient()

    recipientsRepository.create(recipient)

    expect(recipientsRepository.items).toHaveLength(1)

    const result = await sut.execute({
      recipientId: recipient.id.toString()
    })

    expect(result.isRight()).toBe(true)
    expect(recipientsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non-existent recipient', async () => {
    const result = await sut.execute({
      recipientId: 'non-existent-recipient-id'
    })

    expect(result.isLeft()).toBe(true)
  })
})
