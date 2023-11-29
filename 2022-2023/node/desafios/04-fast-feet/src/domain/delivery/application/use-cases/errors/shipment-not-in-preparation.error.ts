import { UseCaseError } from '@/core/errors/use-cases.error'

export class ShipmentNotInPreparationError
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Shipment is not in preparation.')
  }
}
