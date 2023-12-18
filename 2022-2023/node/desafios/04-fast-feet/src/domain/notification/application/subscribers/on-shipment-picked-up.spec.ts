import { SpyInstance } from 'vitest'
import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
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
import { OnShipmentPickedUp } from './on-shipment-picked-up'
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

describe('On shipment picked up', () => {
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

    new OnShipmentPickedUp(recipientsRepository, sendSms)
  })

  it('should send a notification when a shipment is picked up', async () => {
    const recipient = makeRecipient()
    const deliveryDriver = makeDeliveryDriver()

    const shipment = makeShipment({
      recipientId: recipient.id,
      availableForPickupAt: new Date()
    })

    recipientsRepository.create(recipient)
    shipmentsRepository.create(shipment)

    shipment.deliveryDriverId = deliveryDriver.id

    shipmentsRepository.save(shipment)

    await waitFor(() => {
      expect(sendSmsExecuteSpy).toHaveBeenCalled()
    })
  })
})
