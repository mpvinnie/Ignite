import { EventHandler } from '@/core/events/event-handler'
import { RecipientsRepository } from '@/domain/delivery/application/repositories/recipients.repository'
import { ShipmentPickedUpEvent } from '@/domain/delivery/enterprise/events/shipment-picked-up.event'
import { SendSmsUseCase } from '../use-cases/send-sms'
import { DomainEvents } from '@/core/events/domain-events'

export class OnShipmentPickedUp implements EventHandler {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private sendSms: SendSmsUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendShipmentPickedUpNotification.bind(this),
      ShipmentPickedUpEvent.name
    )
  }

  private async sendShipmentPickedUpNotification({
    shipment
  }: ShipmentPickedUpEvent) {
    const recipient = await this.recipientsRepository.findById(
      shipment.recipientId.toValue()
    )

    if (recipient) {
      await this.sendSms.execute({
        recipientPhone: recipient.phone,
        shipmentTrackingNumber: shipment.trackingNumber,
        content: 'Seu pacote está a caminho do seu endereço!'
      })
    }
  }
}
