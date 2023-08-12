import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch answer comments', () => {
  beforeEach(() => {
    answerCommentsRepository = new InMemoryAnswerCommentsRepository()

    sut = new FetchAnswerCommentsUseCase(answerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    await answerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1')
      })
    )

    await answerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1')
      })
    )

    await answerCommentsRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1')
      })
    )

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1
    })

    expect(answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await answerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1')
        })
      )
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2
    })

    expect(answerComments).toHaveLength(2)
  })
})