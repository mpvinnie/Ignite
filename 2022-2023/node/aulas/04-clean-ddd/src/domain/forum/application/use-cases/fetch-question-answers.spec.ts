import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { FetchQuestionAnsersUseCase } from './fetch-question-answers'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let answersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnsersUseCase

describe('Fetch question answers', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()

    sut = new FetchQuestionAnsersUseCase(answersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1')
      })
    )
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1')
      })
    )
    await answersRepository.create(
      makeAnswer({
        questionId: new UniqueEntityID('question-1')
      })
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await answersRepository.create(
        makeAnswer({
          questionId: new UniqueEntityID('question-1')
        })
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
