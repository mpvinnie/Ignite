import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let answersRepository: InMemoryAnswersRepository
let studentsRepository: InMemoryStudentsRepository
let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Comment on answer', () => {
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository()
    answersRepository = new InMemoryAnswersRepository(
      answerAttachmentsRepository
    )
    studentsRepository = new InMemoryStudentsRepository()
    answerCommentsRepository = new InMemoryAnswerCommentsRepository(
      studentsRepository
    )

    sut = new CommentOnAnswerUseCase(
      answersRepository,
      answerCommentsRepository
    )
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await answersRepository.create(answer)

    await sut.execute({
      authorId: answer.authorId.toString(),
      answerId: answer.id.toString(),
      content: 'Answer comment'
    })

    expect(answerCommentsRepository.items[0].content).toEqual('Answer comment')
  })
})
