import ICreateCategoryDTO from '../dtos/ICreateCategoryDTO'
import Category from '../infra/typeorm/entities/Category'

export default interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>
  find(): Promise<Category[]>
  findByName(name: string): Promise<Category>
  findById(id: string): Promise<Category>
}
