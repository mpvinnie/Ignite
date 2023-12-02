import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
import { makeRecipient } from '../../../../../test/factories/make-recipient'
import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryDeliveryDriversRepository } from '../../../../../test/repositories/in-memory-delivery-drivers.repository'
import { InMemoryRecipientsRepository } from '../../../../../test/repositories/in-memory-recipients.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { FetchNearbyDeliveryDriverShipmentsUseCase } from './fetch-nearby-delivery-driver-shipments'

let deliveryDriversRepository: InMemoryDeliveryDriversRepository
let recipientsRepository: InMemoryRecipientsRepository
let attachmentsRepository: InMemoryAttachmentsRepository
let shipmentsRepository: InMemoryShipmentsRepository
let sut: FetchNearbyDeliveryDriverShipmentsUseCase

describe('Fetch nearby delivery driver shipments', () => {
  beforeEach(() => {
    deliveryDriversRepository = new InMemoryDeliveryDriversRepository()
    recipientsRepository = new InMemoryRecipientsRepository()
    attachmentsRepository = new InMemoryAttachmentsRepository()
    shipmentsRepository = new InMemoryShipmentsRepository(
      recipientsRepository,
      attachmentsRepository
    )
    sut = new FetchNearbyDeliveryDriverShipmentsUseCase(shipmentsRepository)
  })

  it('should be able to fetch nearby delivery driver shipments', async () => {
    const nearbyRecipient = makeRecipient({
      latitude: -3.062715050441414,
      longitude: -60.0250618592112
    }) // less than 3km
    const farRecipient = makeRecipient({
      latitude: -3.045162690323952,
      longitude: -60.0248063720078
    }) // more than 3km

    const deliveryDriver = makeDeliveryDriver()

    const nearbyShipment = makeShipment({
      deliveryDriverId: deliveryDriver.id,
      recipientId: nearbyRecipient.id,
      status: 'IN_TRANSIT',
      inTransitAt: new Date()
    })

    const farShipment = makeShipment({
      deliveryDriverId: deliveryDriver.id,
      recipientId: farRecipient.id,
      status: 'IN_TRANSIT',
      inTransitAt: new Date()
    })

    recipientsRepository.create(nearbyRecipient)
    recipientsRepository.create(farRecipient)
    deliveryDriversRepository.create(deliveryDriver)
    shipmentsRepository.create(nearbyShipment)
    shipmentsRepository.create(farShipment)

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toValue(),
      deliveryDriverLatitude: -3.0832691254062494,
      deliveryDriverLongitude: -60.02655071864994
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.shipments).toHaveLength(1)
    expect(result.value?.shipments[0]).toEqual(nearbyShipment)
  })
})
