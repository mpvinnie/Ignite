import { UseCaseError } from '@/core/errors/use-cases.error'

export class InvalidStockQuantityError extends Error implements UseCaseError {
  constructor() {
    super('Invalid stock quantity.')
  }
}
