import { PaginationParams } from '@/core/repositories/paginations-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/question-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const question = await this.prisma.question.findUnique({
      where: {
        id
      }
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string) {
    throw new Error('Method not implemented.')
  }

  async findManyRecent(params: PaginationParams) {
    throw new Error('Method not implemented.')
  }

  async create(question: Question) {
    throw new Error('Method not implemented.')
  }

  async delete(question: Question) {
    throw new Error('Method not implemented.')
  }

  async save(question: Question) {
    throw new Error('Method not implemented.')
  }
}
