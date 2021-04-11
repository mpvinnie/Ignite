import ICreateCategoryDTO from '../../../dtos/ICreateCategoryDTO'
import ICategoriesRepository from '../../../repositories/ICategoriesRepository'
import Category from '../entities/Category'

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = []

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category()

    Object.assign(category, {
      name,
      description
    })

    this.categories.push(category)

    return category
  }

  async find(): Promise<Category[]> {
    return this.categories
  }
}

export default CategoriesRepository
