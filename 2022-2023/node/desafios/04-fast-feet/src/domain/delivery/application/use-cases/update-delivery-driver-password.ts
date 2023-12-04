import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { DeliveryDriversRepository } from '../repositories/delivery-drivers.repository'
import { HashGenerator } from '../cryptography/hash-generator'

interface UpdateDeliveryDriverPasswordUseCaseRequest {
  deliveryDriverId: string
  password: string
}

type UpdateDeliveryDriverPasswordUseCaseResponse = Either<
  ResourceNotFoundError,
  {}
>

export class UpdateDeliveryDriverPasswordUseCase {
  constructor(
    private deliveryDriversRepository: DeliveryDriversRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    deliveryDriverId,
    password
  }: UpdateDeliveryDriverPasswordUseCaseRequest): Promise<UpdateDeliveryDriverPasswordUseCaseResponse> {
    const deliveryDriver =
      await this.deliveryDriversRepository.findById(deliveryDriverId)

    if (!deliveryDriver) {
      return left(new ResourceNotFoundError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    deliveryDriver.password = hashedPassword

    await this.deliveryDriversRepository.save(deliveryDriver)

    return right({})
  }
}
