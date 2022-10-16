import { AppError } from '../../../../shared/errors/AppError'
import { InMemoryUsersRepository } from '../../../users/repositories/in-memory/InMemoryUsersRepository'
import { InMemoryStatementsRepository } from '../../repositories/in-memory/InMemoryStatementsRepository'
import { CreateStatementUseCase } from './CreateStatementUseCase'

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryStatementsRepository: InMemoryStatementsRepository
let createStatement: CreateStatementUseCase

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw'
}

describe('Create Statement', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    createStatement = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    )
  })

  it('should be able to create a statement', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const statement = await createStatement.execute({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      description: 'Deposito Nubank',
      amount: 60
    })

    expect(statement).toHaveProperty('id')
  })

  it('should not be able to create a statement to a non-existent user', async () => {
    await expect(
      createStatement.execute({
        user_id: 'non-existent-user-id',
        type: OperationType.DEPOSIT,
        description: 'Deposito Nubank',
        amount: 60
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a withdraw statement with insufficient funds', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await createStatement.execute({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      description: 'Deposito Nubank',
      amount: 60
    })

    await expect(
      createStatement.execute({
        user_id: user.id as string,
        type: OperationType.WITHDRAW,
        description: 'Saque',
        amount: 70
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
