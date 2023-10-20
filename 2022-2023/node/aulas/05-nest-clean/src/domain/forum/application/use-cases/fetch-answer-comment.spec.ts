import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let studentsRepository: InMemoryStudentsRepository
let answerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch answer comments', () => {
  beforeEach(() => {
    studentsRepository = new InMemoryStudentsRepository()
    answerCommentsRepository = new InMemoryAnswerCommentsRepository(
      studentsRepository
    )

    sut = new FetchAnswerCommentsUseCase(answerCommentsRepository)
  })

  it('should be able to fetch answer comments', async () => {
    const student = makeStudent({ name: 'John Doe' })

    studentsRepository.items.push(student)

    const answer1 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id
    })

    const answer2 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id
    })

    const answer3 = makeAnswerComment({
      answerId: new UniqueEntityID('answer-1'),
      authorId: student.id
    })

    await answerCommentsRepository.create(answer1)
    await answerCommentsRepository.create(answer2)
    await answerCommentsRepository.create(answer3)

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1
    })

    expect(result.value?.comments).toHaveLength(3)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'John Doe',
          commentId: answer1.id
        }),
        expect.objectContaining({
          author: 'John Doe',
          commentId: answer2.id
        }),
        expect.objectContaining({
          author: 'John Doe',
          commentId: answer3.id
        })
      ])
    )
  })

  it('should be able to fetch paginated answer comments', async () => {
    const student = makeStudent({ name: 'John Doe' })

    studentsRepository.items.push(student)

    for (let i = 1; i <= 22; i++) {
      await answerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
          authorId: student.id
        })
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
