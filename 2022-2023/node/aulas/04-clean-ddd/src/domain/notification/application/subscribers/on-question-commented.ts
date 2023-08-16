import { DomainEvents } from '@/core/events/domain-events'
import { EventHandler } from '@/core/events/event-handler.ts'
import { QuestionCommentedEvent } from '@/domain/forum/enterprise/events/question-commented'
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnQuestionCommented implements EventHandler {
  constructor(
    private questionsRepository: QuestionsRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions() {
    DomainEvents.register(
      this.sendQuestionCommentNotification.bind(this),
      QuestionCommentedEvent.name
    )
  }

  private async sendQuestionCommentNotification({
    questionComment
  }: QuestionCommentedEvent) {
    const question = await this.questionsRepository.findById(
      questionComment.questionId.toString()
    )

    if (question) {
      await this.sendNotification.execute({
        recipientId: question.authorId.toString(),
        title: `Novo comentário em "${question.title
          .substring(0, 40)
          .concat('...')}"`,
        content: questionComment.excerpt
      })
    }
  }
}
