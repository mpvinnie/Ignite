import { container } from 'tsyringe'

import { IStatementsRepository } from '../../modules/statements/repositories/IStatementsRepository'
import ITransfersRepository from '../../modules/statements/repositories/ITransfersRepository'
import { StatementsRepository } from '../../modules/statements/repositories/StatementsRepository'
import TransfersRepository from '../../modules/statements/repositories/TransfersRepository'
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository'
import { UsersRepository } from '../../modules/users/repositories/UsersRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IStatementsRepository>(
  'StatementsRepository',
  StatementsRepository
)

container.registerSingleton<ITransfersRepository>(
  'TransfersRepository',
  TransfersRepository
)
