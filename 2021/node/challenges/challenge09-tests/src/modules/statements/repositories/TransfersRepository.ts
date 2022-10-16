import { getRepository, Repository } from 'typeorm'

import Transfer from '../entities/Transfer'
import ICreateTransferDTO from '../useCases/createTransfer/ICreateTransferDTO'
import { IGetBalanceDTO } from '../useCases/getBalance/IGetBalanceDTO'
import ITransfersRepository from './ITransfersRepository'

class TransfersRepository implements ITransfersRepository {
  private repository: Repository<Transfer>

  constructor() {
    this.repository = getRepository(Transfer)
  }

  async create({
    sender_id,
    recipient_id,
    amount,
    description
  }: ICreateTransferDTO): Promise<Transfer> {
    const transfer = this.repository.create({
      sender_id,
      recipient_id,
      amount,
      description
    })

    await this.repository.save(transfer)

    return transfer
  }

  async getUserTransferBalance({
    user_id,
    with_statement
  }: IGetBalanceDTO): Promise<
    { balance: number } | { balance: number; transfer: Transfer[] }
  > {
    const transfers = await this.repository.find({
      where: [{ recipient_id: user_id }, { sender_id: user_id }]
    })

    const balance = transfers.reduce((acc, operation) => {
      if (operation.recipient_id === user_id) {
        return acc + operation.amount
      } else {
        return acc - operation.amount
      }
    }, 0)

    if (with_statement) {
      return {
        balance,
        transfer: transfers
      }
    }

    return { balance }
  }
}

export default TransfersRepository
