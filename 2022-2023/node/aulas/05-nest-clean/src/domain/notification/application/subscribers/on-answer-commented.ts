import { EventHandler } from '@/core/events/event-handler.ts'
import { AnswerCommentedEvent } from '@/domain/forum/enterprise/events/answer-commented'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { DomainEvents } from '@/core/events/domain-events'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class OnAnswerCommented implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotification: SendNotificationUseCase
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions() {
    DomainEvents.register(
      this.sendNewCommmentOnAnswerNotification.bind(this),
      AnswerCommentedEvent.name
    )
  }

  async sendNewCommmentOnAnswerNotification({
    answerComment
  }: AnswerCommentedEvent) {
    const answer = await this.answersRepository.findById(
      answerComment.answerId.toString()
    )

    if (answer) {
      await this.sendNotification.execute({
        recipientId: answer.authorId.toString(),
        title: 'Novo comentário em sua resposta',
        content: answerComment.excerpt
      })
    }
  }
}
