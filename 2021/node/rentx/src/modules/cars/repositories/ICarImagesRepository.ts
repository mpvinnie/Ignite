import ICreateCarImageDTO from '../dtos/ICreateCarImageDTO'
import CarImage from '../infra/typeorm/entities/CarImage'

export default interface ICarImagesRepository {
  create(data: ICreateCarImageDTO): Promise<CarImage>
}
