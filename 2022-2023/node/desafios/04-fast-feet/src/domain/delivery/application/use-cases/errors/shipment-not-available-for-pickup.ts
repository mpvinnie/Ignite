import { UseCaseError } from '@/core/errors/use-cases.error'

export class ShipmentNotAvailableForPickup
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Shipment is not available for pickup.')
  }
}
