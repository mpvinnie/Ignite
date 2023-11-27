import { Either, left, right } from '@/core/either'
import { Shipment } from '../../enterprise/entities/shipment'
import { RecipientsRepository } from '../repositories/recipients.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { ShipmentsRepository } from '../repositories/shipments.repository'

interface FetchRecipientShipmentsUseCaseRequest {
  recipmentId: string
}

type FetchRecipientShipmentsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    shipments: Shipment[]
  }
>

export class FetchRecipientShipmentsUseCase {
  constructor(
    private recipientsRepository: RecipientsRepository,
    private shipmentsRepository: ShipmentsRepository
  ) {}

  async execute({
    recipmentId
  }: FetchRecipientShipmentsUseCaseRequest): Promise<FetchRecipientShipmentsUseCaseResponse> {
    const recipient = await this.recipientsRepository.findById(recipmentId)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    const shipments =
      await this.shipmentsRepository.findManyByRecipientId(recipmentId)

    return right({ shipments })
  }
}
