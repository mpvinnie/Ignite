import { SpyInstance } from 'vitest'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { InMemorySmsRepository } from '../../../../../test/repositories/in-memory-sms.repository'
import {
  SendSmsUseCase,
  SendSmsUseCaseRequest,
  SendSmsUseCaseResponse
} from '../use-cases/send-sms'
import { OnShipmentDelivered } from './on-shipment-delivered'
import { makeRecipient } from '../../../../../test/factories/make-recipient'
import { makeShipment } from '../../../../../test/factories/make-shipment'
import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { Attachment } from '@/domain/delivery/enterprise/entities/attachment'
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

describe('On shipment delivered', () => {
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

    new OnShipmentDelivered(recipientsRepository, sendSms)
  })

  it('should be able to send a notification when a shipment is delivered', async () => {
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

    shipment.attachment = Attachment.create({
      shipmentId: shipment.id,
      title: 'attachment-file-name',
      url: 'url://attachment.png'
    })

    shipmentsRepository.save(shipment)

    await waitFor(() => {
      expect(sendSmsExecuteSpy).toHaveBeenCalled()
    })
  })
})
