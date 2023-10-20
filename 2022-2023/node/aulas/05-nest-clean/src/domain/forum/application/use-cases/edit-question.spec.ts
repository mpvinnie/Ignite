import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { makeQuestionAttachment } from 'test/factories/make-question-attachment'
import { NotAllowedError } from '@/core/errors/not-allowed-error'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let attachmentsRepository: InMemoryAttachmentsRepository
let studentsRepository: InMemoryStudentsRepository
let questionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    attachmentsRepository = new InMemoryAttachmentsRepository()
    studentsRepository = new InMemoryStudentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
      attachmentsRepository,
      studentsRepository
    )

    sut = new EditQuestionUseCase(
      questionsRepository,
      questionAttachmentsRepository
    )
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1')
      },
      new UniqueEntityID('question-1')
    )

    await questionsRepository.create(newQuestion)

    questionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1')
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2')
      })
    )

    await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toValue(),
      title: 'New test title',
      content: 'New test content',
      attachmentsIds: ['1', '3']
    })

    expect(questionsRepository.items[0]).toMatchObject({
      title: 'New test title',
      content: 'New test content'
    })
    expect(questionsRepository.items[0].attachments.currentItems).toHaveLength(
      2
    )
    expect(questionsRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityID('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityID('3') })
    ])
  })

  it('should not be able to edit a question from another author', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1')
      },
      new UniqueEntityID('question-1')
    )

    await questionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: newQuestion.id.toValue(),
      title: 'New test title',
      content: 'New test content',
      attachmentsIds: []
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })

  it('should sync new and removed attachments when aditing a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityID('author-1')
      },
      new UniqueEntityID('question-1')
    )

    await questionsRepository.create(newQuestion)

    questionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('1')
      }),
      makeQuestionAttachment({
        questionId: newQuestion.id,
        attachmentId: new UniqueEntityID('2')
      })
    )

    const result = await sut.execute({
      authorId: 'author-1',
      questionId: newQuestion.id.toValue(),
      title: 'New test title',
      content: 'New test content',
      attachmentsIds: ['1', '3']
    })

    expect(result.isRight()).toBe(true)
    expect(questionAttachmentsRepository.items).toHaveLength(2)
    expect(questionAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityID('1')
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityID('3')
        })
      ])
    )
  })
})
