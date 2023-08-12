import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete question comment', () => {
  beforeEach(() => {
    questionCommentsRepository = new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionCommentUseCase(questionCommentsRepository)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await questionCommentsRepository.create(questionComment)

    await sut.execute({
      authorId: questionComment.authorId.toString(),
      questionCommentId: questionComment.id.toString()
    })

    expect(questionCommentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityID('author-1')
    })

    await questionCommentsRepository.create(questionComment)

    await expect(() =>
      sut.execute({
        authorId: 'another-author-id',
        questionCommentId: questionComment.id.toString()
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
