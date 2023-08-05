import { CreateOrgDTO } from '@/dtos/org-dtos'
import { OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: CreateOrgDTO) {
    const org = await prisma.org.create({
      data
    })

    return org
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: {
        email
      }
    })

    return org
  }

}
