import { AppError } from "../../../../shared/errors/AppError"
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository"
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryStatementsRepository: InMemoryStatementsRepository
let getStatementOperation: GetStatementOperationUseCase

enum OperationType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
}

describe('Get Statement Operation', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    getStatementOperation = new GetStatementOperationUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    )
  })

  it('should be able to get statement operation', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const statement = await inMemoryStatementsRepository.create({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      description: 'Deposito Nubank',
      amount: 60
    })

    const statementOperation = await getStatementOperation.execute({
      user_id: user.id as string,
      statement_id: statement.id as string
    })

    expect(statementOperation).toEqual(statement)
  })

  it('should not be able to get statement operation to a non-existent user', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const statement = await inMemoryStatementsRepository.create({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      description: 'Deposito Nubank',
      amount: 60
    })

    await expect(getStatementOperation.execute({
      user_id: 'non-existent-user-id',
      statement_id: statement.id as string
    })).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to get non-existet statement operation', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(getStatementOperation.execute({
      user_id: user.id as string,
      statement_id: 'non-existent-statement-id'
    })).rejects.toBeInstanceOf(AppError)
  })
})
