import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let questionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get quesiton by slug', () => {
  beforeEach(() => {
    questionsRepository = new InMemoryQuestionsRepository()

    sut = new GetQuestionBySlugUseCase(questionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = Question.create({
      authorId: new UniqueEntityID(),
      title: 'Question title',
      slug: Slug.create('question-title'),
      content: 'Question content'
    })

    await questionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'question-title'
    })

    expect(question.id).toEqual(newQuestion.id)
    expect(question.title).toEqual(newQuestion.title)
  })
})
