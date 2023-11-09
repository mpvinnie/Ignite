import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { DeliveryDriversRepository } from '../repositories/delivery-drivers.repository'

interface DeleteDeliveryDriverUseCaseRequest {
  deliveryDriverId: string
}

type DeleteDeliveryDriverUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteDeliveryDriverUseCase {
  constructor(private deliveryDriversRepository: DeliveryDriversRepository) {}

  async execute({
    deliveryDriverId
  }: DeleteDeliveryDriverUseCaseRequest): Promise<DeleteDeliveryDriverUseCaseResponse> {
    const deliveryDriver =
      await this.deliveryDriversRepository.findById(deliveryDriverId)

    if (!deliveryDriver) {
      return left(new ResourceNotFoundError())
    }

    await this.deliveryDriversRepository.delete(deliveryDriver)

    return right({})
  }
}
