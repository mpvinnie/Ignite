import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Recipient,
  RecipientProps
} from '@/domain/delivery/enterprise/entities/recipient'
import { faker } from '@faker-js/faker'

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityId
) {
  const recipient = Recipient.create(
    {
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      streetNumber: faker.location.buildingNumber(),
      street: faker.location.street(),
      neighborhood: 'Downtown',
      city: faker.location.city(),
      state: faker.location.state(),
      country: faker.location.country(),
      zipCode: faker.location.zipCode(),
      complement: faker.location.streetAddress(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override
    },
    id
  )

  return recipient
}
