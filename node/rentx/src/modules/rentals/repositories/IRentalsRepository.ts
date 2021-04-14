import ICreateRentalDTO from '../dtos/ICreateRentalDTO'
import Rental from '../infra/typeorm/entities/Rental'

export default interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>
  findOpenRentalByUserId(user_id: string): Promise<Rental>
  findOpenRentalByCarId(car_id: string): Promise<Rental>
}
