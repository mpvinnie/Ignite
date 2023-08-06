import { CreateOrgDTO } from '@/dtos/org-dtos'
import { Org } from '@prisma/client'

export interface OrgsRepository {
  create(data: CreateOrgDTO): Promise<Org>
  findByEmail(email: string): Promise<Org | null>
  findById(id: string): Promise<Org | null>
}
