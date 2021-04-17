import Transfer from '../entities/Transfer'
import ICreateTransferDTO from '../useCases/createTransfer/ICreateTransferDTO'
import { IGetBalanceDTO } from '../useCases/getBalance/IGetBalanceDTO'

export default interface ITransfersRepository {
  create(data: ICreateTransferDTO): Promise<Transfer>
  getUserTransferBalance(
    data: IGetBalanceDTO
  ): Promise<{ balance: number } | { balance: number; transfer: Transfer[] }>
}
