import { Router } from 'express'
import multer from 'multer'

import CreateCategoryController from '../../../useCases/createCategory/CreateCategoryController'
import ImportCategoryController from '../../../useCases/importCategory/ImportCategoryController'
import ListCategoriesController from '../../../useCases/listCategories/ListCategoriesController'

const categoriesRoutes = Router()

const upload = multer({
  dest: './tmp'
})

const createCategoryController = new CreateCategoryController()
const listCategoriesController = new ListCategoriesController()
const importCategoryController = new ImportCategoryController()

categoriesRoutes.get('/', listCategoriesController.handle)
categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  importCategoryController.handle
)

export default categoriesRoutes
