import { SpyInstance } from 'vitest'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { InMemorySmsRepository } from '../../../../../test/repositories/in-memory-sms.repository'
import {
  SendSmsUseCase,
  SendSmsUseCaseRequest,
  SendSmsUseCaseResponse
} from '../use-cases/send-sms'
import { OnShipmentReturned } from './on-shipment-returned'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { makeRecipient } from '../../../../../test/factories/make-recipient'
import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
import { makeShipment } from '../../../../../test/factories/make-shipment'
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

describe('On shipment returned', () => {
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

    new OnShipmentReturned(recipientsRepository, sendSms)
  })

  it('should be able to send a notification when a shipment is returned', async () => {
    const recipient = makeRecipient()
    const deliveryDriver = makeDeliveryDriver()
    const shipment = makeShipment({
      recipientId: recipient.id,
      deliveryDriverId: deliveryDriver.id,
      inTransitAt: new Date(),
      status: 'IN_TRANSIT'
    })

    recipientsRepository.create(recipient)
    shipmentsRepository.create(shipment)

    shipment.returnedAt = new Date()

    shipmentsRepository.save(shipment)

    await waitFor(() => {
      expect(sendSmsExecuteSpy).toHaveBeenCalled()
    })
  })
})
