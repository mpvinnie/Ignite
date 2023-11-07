import { Either, left, right } from '@/core/either'
import { DeliveryDriver } from '../../enterprise/entities/delivery-driver'
import { DeliveryDriversRepository } from '../repositories/delivery-drivers.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

interface GetDeliveryDriverByCpfUseCaseRequest {
  cpf: string
}

type GetDeliveryDriverByCpfUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryDriver: DeliveryDriver
  }
>

export class GetDeliveryDriverByCpfUseCase {
  constructor(private deliveryDriversRepository: DeliveryDriversRepository) {}

  async execute({
    cpf
  }: GetDeliveryDriverByCpfUseCaseRequest): Promise<GetDeliveryDriverByCpfUseCaseResponse> {
    const deliveryDriver = await this.deliveryDriversRepository.findByCpf(cpf)

    if (!deliveryDriver) {
      return left(new ResourceNotFoundError())
    }

    return right({ deliveryDriver })
  }
}
