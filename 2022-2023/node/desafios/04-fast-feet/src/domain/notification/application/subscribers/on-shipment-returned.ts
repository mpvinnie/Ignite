import { EventHandler } from '@/core/events/event-handler'
import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients.repository'
import { ShipmentReturnedEvent } from '@/domain/delivery/enterprise/events/shipment-returned.event'
import { SendSmsUseCase } from '../use-cases/send-sms'
import { DomainEvents } from '@/core/events/domain-events'

export class OnShipmentReturned implements EventHandler {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private sendSms: SendSmsUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendShipmentReturnedNotification.bind(this),
      ShipmentReturnedEvent.name
    )
  }

  private async sendShipmentReturnedNotification({
    shipment
  }: ShipmentReturnedEvent) {
    const recipient = await this.recipientsRepository.findById(
      shipment.recipientId.toValue()
    )

    if (recipient) {
      await this.sendSms.execute({
        recipientPhone: recipient.phone,
        shipmentTrackingNumber: shipment.trackingNumber,
        content:
          'Seu pacote foi devoldido à transportadora, faremos outra tentativa de entrega em breve.'
      })
    }
  }
}
