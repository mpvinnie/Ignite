import ICreateSpecficationDTO from '../dtos/ICreateSpecificationDTO'
import Specification from '../entities/Specification'

export default interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecficationDTO): Promise<void>
  findByName(name: string): Promise<Specification>
}
