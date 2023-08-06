import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { OrgAlreadyExistsError } from './errors/org-already-exists-error'
import { hash } from 'bcryptjs'

interface RegisterOrgRequest {
  responsible_name: string
  email: string
  password: string
  zip_code: string
  address: string
  whatsapp: string
}

interface RegisterOrgResponse {
  org: Org
}

export class RegisterOrg {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    responsible_name,
    email,
    password,
    zip_code,
    address,
    whatsapp
  }: RegisterOrgRequest): Promise<RegisterOrgResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (orgWithSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      responsible_name,
      email,
      password_hash: password_hash,
      zip_code,
      address,
      whatsapp
    })

    return {
      org
    }
  }
}
