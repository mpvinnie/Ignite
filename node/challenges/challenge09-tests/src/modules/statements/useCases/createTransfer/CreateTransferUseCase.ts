import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '../../../users/repositories/IUsersRepository'
import Transfer from '../../entities/Transfer'
import { IStatementsRepository } from '../../repositories/IStatementsRepository'
import ITransfersRepository from '../../repositories/ITransfersRepository'
import { CreateTransferError } from './CreateTransferError'

interface IRequest {
  sender_id: string
  recipient_id: string
  amount: number
  description: string
}

@injectable()
class CreateTransferUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository,
    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository
  ) {}

  async execute({
    sender_id,
    recipient_id,
    amount,
    description
  }: IRequest): Promise<Transfer> {
    const recipient = await this.usersRepository.findById(recipient_id)

    if (!recipient) {
      throw new CreateTransferError.RecipientNotFound()
    }

    const sender_balance = await this.statementsRepository.getUserBalance({
      user_id: sender_id
    })

    if (Number(sender_balance) < amount) {
      throw new CreateTransferError.InsufficientFunds()
    }

    const tranfer = await this.transfersRepository.create({
      sender_id,
      recipient_id,
      amount,
      description
    })

    return tranfer
  }
}

export default CreateTransferUseCase
