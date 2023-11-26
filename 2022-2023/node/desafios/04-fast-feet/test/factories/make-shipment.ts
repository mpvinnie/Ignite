import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Shipment,
  ShipmentProps
} from '@/domain/delivery/enterprise/entities/shipment'
import { generateTrackingNumber } from '@/utils/generate-tracking-number'
import { faker } from '@faker-js/faker'

export function makeShipment(
  override: Partial<ShipmentProps> = {},
  id?: UniqueEntityId
) {
  const shipment = Shipment.create(
    {
      recipientId: new UniqueEntityId(),
      trackingNumber: generateTrackingNumber(),
      weightInGrams: faker.number.int({ min: 0, max: 5000 }),
      ...override
    },
    id
  )

  return shipment
}
