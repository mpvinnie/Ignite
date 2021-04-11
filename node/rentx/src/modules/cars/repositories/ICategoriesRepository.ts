import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO'
import Category from '../infra/typeorm/entities/Category'

export default interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>
}
