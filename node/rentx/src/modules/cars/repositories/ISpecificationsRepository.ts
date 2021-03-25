import ICreateSpecficationDTO from '../dtos/ICreateSpecificationDTO'
import Specification from '../models/Specification'

export default interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecficationDTO): void
  findByName(name: string): Specification
}
