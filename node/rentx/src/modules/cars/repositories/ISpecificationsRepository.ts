import ICreateSpecficationDTO from '../dtos/ICreateSpecificationDTO'
import Specification from '../entities/Specification'

export default interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecficationDTO): void
  findByName(name: string): Specification
}
