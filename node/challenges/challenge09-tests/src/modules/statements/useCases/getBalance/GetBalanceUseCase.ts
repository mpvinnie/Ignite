import { inject, injectable } from 'tsyringe'

import { IUsersRepository } from '../../../users/repositories/IUsersRepository'
import { Statement } from '../../entities/Statement'
import Transfer from '../../entities/Transfer'
import { IStatementsRepository } from '../../repositories/IStatementsRepository'
import ITransfersRepository from '../../repositories/ITransfersRepository'
import { GetBalanceError } from './GetBalanceError'

interface IRequest {
  user_id: string
}

interface IResponse {
  statement: Statement[]
  balance: number
}

@injectable()
export class GetBalanceUseCase {
  constructor(
    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('TransfersRepository')
    private transfersRepository: ITransfersRepository
  ) {}

  async execute({ user_id }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new GetBalanceError()
    }

    const statements = (await this.statementsRepository.getUserBalance({
      user_id,
      with_statement: true
    })) as { balance: number; statement: object[] }

    const transfers = (await this.transfersRepository.getUserTransferBalance({
      user_id,
      with_statement: true
    })) as { balance: number; transfer: Transfer[] }

    statements.statement.push(transfers.transfer)

    statements.balance += statements.balance + transfers.balance

    return statements as IResponse
  }
}
