import { OrgsRepository } from '@/repositories/orgs-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { compare } from 'bcryptjs'
import { Org } from '@prisma/client'

interface AuthenticateOrgRequest {
  email: string
  password: string
}

interface AuthenticateOrgResponse {
  org: Org
}

export class AuthenticateOrg {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password
  }: AuthenticateOrgRequest): Promise<AuthenticateOrgResponse> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, org.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      org
    }
  }
}
