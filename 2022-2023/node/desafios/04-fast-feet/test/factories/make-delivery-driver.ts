import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  DeliveryDriver,
  DeliveryDriverProps
} from '@/domain/delivery/enterprise/entities/delivery-driver'
import { Cpf } from '@/domain/delivery/enterprise/entities/value-objects/cpf'
import { faker } from '@faker-js/faker'

export function makeDeliveryDriver(
  override: Partial<DeliveryDriverProps> = {},
  id?: UniqueEntityId
) {
  const deliveryDriver = DeliveryDriver.create(
    {
      name: faker.person.fullName(),
      cpf: Cpf.generate(),
      password: faker.internet.password(),
      ...override
    },
    id
  )

  return deliveryDriver
}
