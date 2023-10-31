import { UseCaseError } from '@/core/errors/use-cases.error'

export class OutOfStockError extends Error implements UseCaseError {
  constructor() {
    super('Product out of stock.')
  }
}
