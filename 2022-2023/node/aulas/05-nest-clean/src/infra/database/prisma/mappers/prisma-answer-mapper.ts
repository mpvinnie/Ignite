import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer } from '@/domain/forum/enterprise/entities/answer'
import { Prisma, Answer as PrismaAnswer } from '@prisma/client'

export class PrismaAnswerMapper {
  static toDomain(raw: PrismaAnswer): Answer {
    return Answer.create({
      questionId: new UniqueEntityID(raw.questionId),
      authorId: new UniqueEntityID(raw.authorId),
      content: raw.content,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    })
  }

  static toPrisma(answer: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      questionId: answer.questionId.toString(),
      authorId: answer.authorId.toString(),
      content: answer.content,
      createdAt: answer.createdAt,
      updatedAt: answer.updatedAt
    }
  }
}
