import ICreateSpecificationDTO from '../../../dtos/ICreateSpecificationDTO'
import ISpecificationsRepository from '../../../repositories/ISpecificationsRepository'
import Specification from '../entities/Specification'

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[] = []

  async create({
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

  async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      specification => specification.name === name
    )
  }
}

export default SpecificationsRepository
