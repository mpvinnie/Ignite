import { AppError } from '../../../../shared/errors/AppError'

export namespace CreateTransferError {
  export class RecipientNotFound extends AppError {
    constructor() {
      super('Recipient not found', 404)
    }
  }

  export class InsufficientFunds extends AppError {
    constructor() {
      super('Insufficient funds', 400)
    }
  }
}
