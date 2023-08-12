import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { makeAnswer } from 'test/factories/make-answer'
import { NotAllowedError } from './errors/not-allowed-error'

let answersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete answer', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()

    sut = new DeleteAnswerUseCase(answersRepository)
  })

  it('should be able to delete an answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1')
      },
      new UniqueEntityID('answer-1')
    )

    await answersRepository.create(newAnswer)

    await sut.execute({
      authorId: 'author-1',
      answerId: 'answer-1'
    })

    expect(answersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete an answer from another author', async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityID('author-1')
      },
      new UniqueEntityID('answer-1')
    )

    await answersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: 'answer-1'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
