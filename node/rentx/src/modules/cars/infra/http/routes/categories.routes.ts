import { Router } from 'express'

import CreateCategoryController from '../../../useCases/createCategory/CreateCategoryController'
import ListCategoriesController from '../../../useCases/listCategories/ListCategoriesController'

const categoriesRoutes = Router()

const createCategoryController = new CreateCategoryController()
const listCategoriesController = new ListCategoriesController()

categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/', createCategoryController.handle)

export default categoriesRoutes
