import ICreateCarDTO from '../dtos/ICreteCarDTO'
import Car from '../infra/typeorm/entities/Car'

export default interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
}
