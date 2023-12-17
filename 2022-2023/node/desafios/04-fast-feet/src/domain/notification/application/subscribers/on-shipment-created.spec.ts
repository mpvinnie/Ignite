import { SpyInstance } from 'vitest'
import { makeRecipient } from '../../../../../test/factories/make-recipient'
import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { InMemorySmsRepository } from '../../../../../test/repositories/in-memory-sms.repository'
import {
  SendSmsUseCase,
  SendSmsUseCaseRequest,
  SendSmsUseCaseResponse
} from '../use-cases/send-sms'
import { OnShipmentCreated } from './on-shipment-created'
import { waitFor } from '../../../../../test/utils/wait-for'

let recipientsRepository: InMemoryRecipientsRepository
let attachmentsRepository: InMemoryAttachmentsRepository
let shipmentsRepository: InMemoryShipmentsRepository
let smsRepository: InMemorySmsRepository
let sendSms: SendSmsUseCase

let sendSmsExecuteSpy: SpyInstance<
  [SendSmsUseCaseRequest],
  Promise<SendSmsUseCaseResponse>
>

describe('On shipment created', () => {
  beforeEach(() => {
    recipientsRepository = new InMemoryRecipientsRepository()
    attachmentsRepository = new InMemoryAttachmentsRepository()
    shipmentsRepository = new InMemoryShipmentsRepository(
      recipientsRepository,
      attachmentsRepository
    )
    smsRepository = new InMemorySmsRepository()
    sendSms = new SendSmsUseCase(smsRepository)

    sendSmsExecuteSpy = vi.spyOn(sendSms, 'execute')

    new OnShipmentCreated(recipientsRepository, sendSms)
  })

  it('should send a notification when an shipment is created', async () => {
    const recipient = makeRecipient()
    const shipment = makeShipment({
      recipientId: recipient.id
    })

    recipientsRepository.create(recipient)
    shipmentsRepository.create(shipment)

    await waitFor(() => {
      expect(sendSmsExecuteSpy).toHaveBeenCalled()
    })
  })
})
