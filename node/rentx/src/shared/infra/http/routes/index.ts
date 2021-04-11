import { Router } from 'express'

import categoriesRoutes from '../../../../modules/cars/infra/http/routes/categories.routes'

const routes = Router()

routes.use('/categories', categoriesRoutes)

export default routes
