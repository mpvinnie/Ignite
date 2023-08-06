import { OrgsRepository } from '@/repositories/orgs-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { Org } from '@prisma/client'

interface GetOrgProfileRequest {
  orgId: string
}

interface GetOrgProfileResponse {
  org: Org
}

export class GetOrgProfile {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId
  }: GetOrgProfileRequest): Promise<GetOrgProfileResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    return {
      org
    }
  }
}
