import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { RegisterRecipientUseCase } from './register-recipient'

let recipientsRepository: InMemoryRecipientsRepository
let sut: RegisterRecipientUseCase

describe('Register recipient', () => {
  beforeEach(() => {
    recipientsRepository = new InMemoryRecipientsRepository()
    sut = new RegisterRecipientUseCase(recipientsRepository)
  })

  it('should be able to register a recipient', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      phone: '55999999999',
      streetNumber: '123',
      street: 'Main st.',
      neighborhood: 'Downtown',
      city: 'Exampleville',
      state: 'EX',
      zipCode: '12345678',
      country: 'United States',
      complement: 'Apt 4',
      latitude: 0,
      longitude: 0
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      recipient: recipientsRepository.items[0]
    })
  })
})
