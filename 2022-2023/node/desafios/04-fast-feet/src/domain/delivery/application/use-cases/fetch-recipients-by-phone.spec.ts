import { makeRecipient } from '../../../../../test/factories/make-recipient'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { FetchRecipientsByPhoneUseCase } from './fetch-recipients-by-phone'

let recipientsRepository: InMemoryRecipientsRepository
let sut: FetchRecipientsByPhoneUseCase

describe('Fetch recipients by phone', () => {
  beforeEach(() => {
    recipientsRepository = new InMemoryRecipientsRepository()
    sut = new FetchRecipientsByPhoneUseCase(recipientsRepository)
  })

  it('should be able to fetch recipients by phone', async () => {
    const recipient = makeRecipient({
      phone: '55999999999'
    })
    recipientsRepository.create(recipient)
    recipientsRepository.create(makeRecipient())

    const result = await sut.execute({
      phone: '55999999999'
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.recipients).toHaveLength(1)
    expect(result.value?.recipients[0]).toEqual(recipient)
  })
})
