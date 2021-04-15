import ICreateCarDTO from '../dtos/ICreateCarDTO'
import Car from '../infra/typeorm/entities/Car'

export default interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(license_plate: string): Promise<Car>
  findAvailable(
    category_id?: string,
    name?: string,
    brand?: string
  ): Promise<Car[]>
  findById(id: string): Promise<Car>
  updateAvailability(id: string, available: boolean): Promise<void>
  save(car: Car): Promise<Car>
}
