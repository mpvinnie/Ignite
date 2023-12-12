import { InMemorySmsRepository } from '../../../../../test/repositories/in-memory-sms.repository'
import { SendSmsUseCase } from './send-sms'

let smsRepository: InMemorySmsRepository
let sut: SendSmsUseCase

describe('Send sms', () => {
  beforeEach(() => {
    smsRepository = new InMemorySmsRepository()
    sut = new SendSmsUseCase(smsRepository)
  })

  it('should be able to send a sms', async () => {
    const result = await sut.execute({
      recipientPhone: '99999999999',
      shipmentTrackingNumber: '1234567BR',
      content: 'Sms Content'
    })

    expect(result.isRight()).toBe(true)
    expect(smsRepository.items[0]).toEqual(result.value?.sms)
  })
})
