import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let answersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    answersRepository = new InMemoryAnswersRepository()

    sut = new AnswerQuestionUseCase(answersRepository)
  })

  it('should be able to create a question', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Question content'
    })

    expect(answer.id).toBeTruthy()
    expect(answersRepository.items[0].id).toEqual(answer.id)
  })
})
