import { makeDeliveryDriver } from '../../../../../test/factories/make-delivery-driver'
import { makeShipment } from '../../../../../test/factories/make-shipment'
import { InMemoryAttachmentsRepository } from '../../../../../test/repositories/in-memory-attachments.repository'
import { InMemoryShipmentsRepository } from '../../../../../test/repositories/in-memory-shipments.repository'
import { FakeUploader } from '../../../../../test/storage/fake-uploader'
import { DeliverShipmentUseCase } from './deliver-shipment'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type.error'
import { NotAllowedError } from './errors/not-allowed.error'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { ShipmentNotInTransit } from './errors/shipment-not-in-transit.error'

let attachmentsRepository: InMemoryAttachmentsRepository
let shipmentsRepository: InMemoryShipmentsRepository
let uploader: FakeUploader
let sut: DeliverShipmentUseCase

describe('Deliver shipment', () => {
  beforeEach(() => {
    attachmentsRepository = new InMemoryAttachmentsRepository()
    shipmentsRepository = new InMemoryShipmentsRepository(attachmentsRepository)
    uploader = new FakeUploader()
    sut = new DeliverShipmentUseCase(shipmentsRepository, uploader)
  })

  it('should be able to deliver a shipment', async () => {
    const deliveryDriver = makeDeliveryDriver()
    const shipment = makeShipment({
      deliveryDriverId: deliveryDriver.id,
      status: 'IN_TRANSIT',
      inTransitAt: new Date()
    })

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toValue(),
      shipmentId: shipment.id.toValue(),
      fileName: 'package.png',
      fileType: 'image/png',
      body: Buffer.from('')
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      shipment: expect.objectContaining({
        status: 'DELIVERED',
        deliveredAt: expect.any(Date)
      })
    })
    expect(result.value).toEqual({
      shipment: expect.objectContaining({
        attachment: attachmentsRepository.items[0]
      })
    })
    expect(uploader.uploads).toHaveLength(1)
    expect(uploader.uploads[0]).toEqual(
      expect.objectContaining({
        fileName: 'package.png'
      })
    )
  })

  it('should not be able to deliver a shipment with a invalid file type', async () => {
    const deliveryDriver = makeDeliveryDriver()
    const shipment = makeShipment({
      deliveryDriverId: deliveryDriver.id,
      status: 'IN_TRANSIT',
      inTransitAt: new Date()
    })

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toValue(),
      shipmentId: shipment.id.toValue(),
      fileName: 'package.mp3',
      fileType: 'image/mpeg',
      body: Buffer.from('')
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidAttachmentTypeError)
  })

  it('should not be able to deliver a non-existent shipment', async () => {
    const deliveryDriver = makeDeliveryDriver()

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toValue(),
      shipmentId: 'non-existent-shipment-id',
      fileName: 'package.png',
      fileType: 'image/png',
      body: Buffer.from('')
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to deliver a shipment from another delivery driver', async () => {
    const deliveryDriver = makeDeliveryDriver()
    const shipment = makeShipment({
      deliveryDriverId: deliveryDriver.id,
      status: 'IN_TRANSIT',
      inTransitAt: new Date()
    })

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      deliveryDriverId: 'another-delivery-driver-id',
      shipmentId: shipment.id.toValue(),
      fileName: 'package.png',
      fileType: 'image/png',
      body: Buffer.from('')
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should not be able to deliver a shipment which is not in transit', async () => {
    const deliveryDriver = makeDeliveryDriver()
    const shipment = makeShipment({
      deliveryDriverId: deliveryDriver.id
    })

    shipmentsRepository.create(shipment)

    const result = await sut.execute({
      deliveryDriverId: deliveryDriver.id.toValue(),
      shipmentId: shipment.id.toValue(),
      fileName: 'package.png',
      fileType: 'image/png',
      body: Buffer.from('')
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ShipmentNotInTransit)
  })
})
