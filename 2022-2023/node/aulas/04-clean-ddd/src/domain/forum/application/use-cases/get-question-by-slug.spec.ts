import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let questionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()

    sut = new GetQuestionBySlugUseCase(questionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('question-title')
    })

    await questionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'question-title'
    })

    expect(result.isRight()).toBe(true)

    if (result.isLeft()) {
      return
    }

    expect(result.value.question.id).toBeTruthy()
    expect(result.value.question.title).toEqual(newQuestion.title)
  })
})
