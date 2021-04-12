import { getRepository, Repository } from 'typeorm'

import ICreateSpecificationDTO from '../../../dtos/ICreateSpecificationDTO'
import ISpecificationsRepository from '../../../repositories/ISpecificationsRepository'
import Specification from '../entities/Specification'

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  async create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description
    })

    await this.repository.save(specification)

    return specification
  }

  async findByName(name: string): Promise<Specification> {
    return await this.repository.findOne({ name })
  }
}

export default SpecificationsRepository
