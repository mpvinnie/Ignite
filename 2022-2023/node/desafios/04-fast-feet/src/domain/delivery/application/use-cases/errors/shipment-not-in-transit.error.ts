import { UseCaseError } from '@/core/errors/use-cases.error'

export class ShipmentNotInTransit extends Error implements UseCaseError {
  constructor() {
    super('Shipment is not in transit.')
  }
}
