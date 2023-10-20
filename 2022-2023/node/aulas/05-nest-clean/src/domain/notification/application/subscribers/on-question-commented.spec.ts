import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse
} from '../use-cases/send-notification'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications-repository'
import { OnQuestionCommented } from './on-question-commented'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { SpyInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'
import { InMemoryAttachmentsRepository } from 'test/repositories/in-memory-attachments-repository'
import { InMemoryStudentsRepository } from 'test/repositories/in-memory-students-repository'

let attachmentsRepository: InMemoryAttachmentsRepository
let studentsRepository: InMemoryStudentsRepository
let questionCommentsRepository: InMemoryQuestionCommentsRepository
let questionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let questionsRepository: InMemoryQuestionsRepository
let notificationsRepository: InMemoryNotificationsRepository
let sendNotification: SendNotificationUseCase

let sendNotificationExecuteSpy: SpyInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On question commented', () => {
  beforeEach(() => {
    attachmentsRepository = new InMemoryAttachmentsRepository()
    studentsRepository = new InMemoryStudentsRepository()
    questionCommentsRepository = new InMemoryQuestionCommentsRepository(
      studentsRepository
    )
    questionAttachmentsRepository = new InMemoryQuestionAttachmentsRepository()
    questionsRepository = new InMemoryQuestionsRepository(
      questionAttachmentsRepository,
      attachmentsRepository,
      studentsRepository
    )
    notificationsRepository = new InMemoryNotificationsRepository()
    sendNotification = new SendNotificationUseCase(notificationsRepository)

    sendNotificationExecuteSpy = vi.spyOn(sendNotification, 'execute')

    new OnQuestionCommented(questionsRepository, sendNotification)
  })

  it('should send a notification when question is commented', async () => {
    const question = makeQuestion()
    const questionComment = makeQuestionComment({
      questionId: question.id
    })

    questionsRepository.create(question)
    questionCommentsRepository.create(questionComment)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
