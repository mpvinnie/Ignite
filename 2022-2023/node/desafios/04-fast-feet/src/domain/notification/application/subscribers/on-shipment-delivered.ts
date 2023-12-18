import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients.repository'
import { ShipmentDeliveredEvent } from '@/domain/delivery/enterprise/events/shipment-delivered.event'
import { SendSmsUseCase } from '../use-cases/send-sms'
import dayjs from 'dayjs'

export class OnShipmentDelivered implements EventHandler {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private sendSms: SendSmsUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendShipmentDeliveredNotification.bind(this),
      ShipmentDeliveredEvent.name
    )
  }

  private async sendShipmentDeliveredNotification({
    shipment
  }: ShipmentDeliveredEvent) {
    const recipient = await this.recipientsRepository.findById(
      shipment.recipientId.toValue()
    )

    if (recipient) {
      await this.sendSms.execute({
        recipientPhone: recipient.phone,
        shipmentTrackingNumber: shipment.trackingNumber,
        content: `Seu pacote foi entregue hoje às ${dayjs(
          shipment.deliveredAt
        ).format('HH:mm')}h.`
      })
    }
  }
}
