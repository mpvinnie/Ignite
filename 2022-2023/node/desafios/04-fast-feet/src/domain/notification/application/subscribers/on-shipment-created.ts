import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler'
import { ShipmentCreatedEvent } from '@/domain/delivery/enterprise/events/shipment-created.event'
import { SendSmsUseCase } from '../use-cases/send-sms'
import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients.repository'

export class OnShipmentCreated implements EventHandler {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private sendSms: SendSmsUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendNewShipmentNotification.bind(this),
      ShipmentCreatedEvent.name
    )
  }

  private async sendNewShipmentNotification({
    shipment
  }: ShipmentCreatedEvent) {
    const recipient = await this.recipientsRepository.findById(
      shipment.recipientId.toValue()
    )

    if (recipient) {
      await this.sendSms.execute({
        recipientPhone: recipient.phone,
        shipmentTrackingNumber: shipment.trackingNumber,
        content: `${recipient.name}, seu pacote foi recebido e já estamos o preparando para o envio.`
      })
    }
  }
}
