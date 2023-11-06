import { UseCaseError } from '@/core/errors/use-cases.error'

export class DuplicatedResourceError extends Error implements UseCaseError {
  constructor() {
    super('Duplicated resource.')
  }
}
