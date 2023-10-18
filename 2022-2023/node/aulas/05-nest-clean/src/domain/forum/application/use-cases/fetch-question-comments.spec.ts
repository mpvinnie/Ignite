import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let studentsRepository: InMemoryStudentsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch question comments', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    questionCommentsRepository = new InMemoryQuestionCommentsRepository(
      studentsRepository
    )

    sut = new FetchQuestionCommentsUseCase(questionCommentsRepository)
  })

  it('should be able to fetch question comments', async () => {
    const student = makeStudent({ name: 'John Doe' })

    studentsRepository.items.push(student)

    const comment1 = makeQuestionComment({
      authorId: student.id,
      questionId: new UniqueEntityID('question-1')
    })

    const comment2 = makeQuestionComment({
      authorId: student.id,
      questionId: new UniqueEntityID('question-1')
    })

    const comment3 = makeQuestionComment({
      authorId: student.id,
      questionId: new UniqueEntityID('question-1')
    })

    await questionCommentsRepository.create(comment1)
    await questionCommentsRepository.create(comment2)
    await questionCommentsRepository.create(comment3)

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          commentId: comment1.id,
          author: 'John Doe'
        }),
        expect.objectContaining({
          commentId: comment2.id,
          author: 'John Doe'
        }),
        expect.objectContaining({
          commentId: comment3.id,
          author: 'John Doe'
        })
      ])
    )
  })

  it('should be able to fetch paginated question comments', async () => {
    const student = makeStudent({ name: 'John Doe' })

    studentsRepository.items.push(student)

    for (let i = 1; i <= 22; i++) {
      await questionCommentsRepository.create(
        makeQuestionComment({
          authorId: student.id,
          questionId: new UniqueEntityID('question-1')
        })
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
