import CategoriesRepository from '@modules/cars/infra/typeorm/repositories/CategoriesRepository'
import SpecificationsRepository from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository'
import ICategoriesRepository from '@modules/cars/repositories/ICategoriesRepository'
import ISpecificationsRepository from '@modules/cars/repositories/ISpecificationsRepository'
import { container } from 'tsyringe'

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
)
