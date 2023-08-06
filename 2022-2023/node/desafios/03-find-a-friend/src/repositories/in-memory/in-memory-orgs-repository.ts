import { CreateOrgDTO } from '@/dtos/org-dtos'
import { OrgsRepository } from '../orgs-repository'
import { Org } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { InMemoryDatabase } from './in-memory-database'

export class InMemoryOrgsRepository implements OrgsRepository {
  constructor(private database: InMemoryDatabase) {}

  async create(data: CreateOrgDTO) {
    const org: Org = {
      id: randomUUID(),
      responsible_name: data.responsible_name,
      email: data.email,
      password_hash: data.password_hash,
      zip_code: data.zip_code,
      address: data.address,
      whatsapp: data.whatsapp,
      created_at: new Date()
    }

    this.database.orgs.push(org)

    return org
  }

  async findByEmail(email: string) {
    const org = this.database.orgs.find(item => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.database.orgs.find(item => item.id === id)

    if (!org) {
      return null
    }

    return org
  }
}
