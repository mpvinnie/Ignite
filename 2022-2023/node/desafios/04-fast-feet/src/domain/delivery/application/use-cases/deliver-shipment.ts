import { Either, left, right } from '@/core/either'
import { ShipmentsRepository } from '../repositories/shipments.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { NotAllowedError } from './errors/not-allowed.error'
import { InvalidAttachmentTypeError } from './errors/invalid-attachment-type.error'
import { ShipmentNotInTransit } from './errors/shipment-not-in-transit.error'
import { Uploader } from '../storage/uploader'
import { Attachment } from '../../enterprise/entities/attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Shipment } from '../../enterprise/entities/shipment'

interface DeliverShipmentUseCaseRequest {
  deliveryDriverId: string
  shipmentId: string
  fileName: string
  fileType: string
  body: Buffer
}

type DeliverShipmentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError | InvalidAttachmentTypeError,
  {
    shipment: Shipment
  }
>

export class DeliverShipmentUseCase {
  constructor(
    private shipmentsRepository: ShipmentsRepository,
    private uploader: Uploader
  ) {}

  async execute({
    deliveryDriverId,
    shipmentId,
    fileName,
    fileType,
    body
  }: DeliverShipmentUseCaseRequest): Promise<DeliverShipmentUseCaseResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const shipment = await this.shipmentsRepository.findById(shipmentId)

    if (!shipment) {
      return left(new ResourceNotFoundError())
    }

    if (shipment.deliveryDriverId?.toValue() !== deliveryDriverId) {
      return left(new NotAllowedError())
    }

    if (shipment.status !== 'IN_TRANSIT') {
      return left(new ShipmentNotInTransit())
    }

    const { url } = await this.uploader.upload({
      fileName,
      fileType,
      body
    })

    const attachment = Attachment.create({
      shipmentId: new UniqueEntityId(shipmentId),
      title: fileName,
      url
    })

    shipment.attachment = attachment

    await this.shipmentsRepository.save(shipment)

    return right({ shipment })
  }
}
