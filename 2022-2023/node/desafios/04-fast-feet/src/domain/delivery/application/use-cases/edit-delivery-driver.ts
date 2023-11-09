import { Either, left, right } from '@/core/either'
import { DeliveryDriver } from '../../enterprise/entities/delivery-driver'
import { DeliveryDriversRepository } from '../repositories/delivery-drivers.repository'
import { ResourceNotFoundError } from './errors/resource-not-found.error'
import { HashGenerator } from '../cryptography/hash-generator'

interface EditDeliveryDriverUseCaseRequest {
  deliveryDriverId: string
  name: string
  password?: string
}

type EditDeliveryDriverUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryDriver: DeliveryDriver
  }
>

export class EditDeliveryDriverUseCase {
  constructor(
    private deliveryDriversRepository: DeliveryDriversRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    deliveryDriverId,
    name,
    password
  }: EditDeliveryDriverUseCaseRequest): Promise<EditDeliveryDriverUseCaseResponse> {
    const deliveryDriver =
      await this.deliveryDriversRepository.findById(deliveryDriverId)

    if (!deliveryDriver) {
      return left(new ResourceNotFoundError())
    }

    if (password) {
      const hashedPassword = await this.hashGenerator.hash(password)

      deliveryDriver.password = hashedPassword
    }

    deliveryDriver.name = name

    await this.deliveryDriversRepository.save(deliveryDriver)

    return right({ deliveryDriver })
  }
}
