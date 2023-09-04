import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { ChoseQuestionBestAnswerUseCase } from './choose-question-best-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { NotAllowedError } from '@/core/errors/not-allowed-error'

let questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
let answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
let questionsRepository: InMemoryQuestionsRepository
let answersRepository: InMemoryAnswersRepository
let sut: ChoseQuestionBestAnswerUseCase

describe('Choose question best answer', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository
    )
    answersRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository
    )

    sut = new ChoseQuestionBestAnswerUseCase(
      questionsRepository,
      answersRepository
    )
  })

  it('should be able to choose a best answer for a question', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id
    })

    await questionsRepository.create(question)
    await answersRepository.create(answer)

    await sut.execute({
      authorId: question.authorId.toString(),
      answerId: answer.id.toString()
    })

    expect(questionsRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose another user question best answer', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityID('author-1')
    })

    const answer = makeAnswer({
      questionId: question.id
    })

    await questionsRepository.create(question)
    await answersRepository.create(answer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: answer.id.toString()
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
