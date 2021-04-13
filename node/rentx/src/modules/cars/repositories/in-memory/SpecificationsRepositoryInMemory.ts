import ICreateSpecificationDTO from '@modules/cars/dtos/ICreateSpecificationDTO'
import Specification from '@modules/cars/infra/typeorm/entities/Specification'

import ISpecificationsRepository from '../ISpecificationsRepository'

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = []

  public async create({
    name,
    description
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description
    })

    this.specifications.push(specification)

    return specification
  }

  public async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      specification => specification.name === name
    )

    return specification
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter(specification =>
      ids.includes(specification.id)
    )

    return specifications
  }
}

export default SpecificationsRepositoryInMemory
