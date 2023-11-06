import { Either, left, right } from '@/core/either'
import { DeliveryDriver } from '../../enterprise/entities/delivery-driver'
import { DeliveryDriversRepository } from '../repositories/delivery-drivers.repository'
import { DuplicatedResourceError } from './errors/duplicated-resource.error'
import { Cpf } from '../../enterprise/entities/value-objects/cpf'
import { HashGenerator } from '../cryptography/hash-generator'

interface RegisterDeliveryDriverUseCaseRequest {
  name: string
  cpf: string
  password: string
}

type RegisterDeliveryDriverUseCaseResponse = Either<
  DuplicatedResourceError,
  {
    deliveryDriver: DeliveryDriver
  }
>

export class RegisterDeliveryDriverUseCase {
  constructor(
    private deliveryDriversRepository: DeliveryDriversRepository,
    private hashGenerator: HashGenerator
  ) {}

  async execute({
    name,
    cpf,
    password
  }: RegisterDeliveryDriverUseCaseRequest): Promise<RegisterDeliveryDriverUseCaseResponse> {
    const deliveryDriverWithSameCpf =
      await this.deliveryDriversRepository.findByCpf(cpf)

    if (deliveryDriverWithSameCpf) {
      return left(new DuplicatedResourceError())
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const deliveryDriver = DeliveryDriver.create({
      cpf: Cpf.create(cpf),
      name,
      password: hashedPassword
    })

    await this.deliveryDriversRepository.create(deliveryDriver)

    return right({ deliveryDriver })
  }
}
