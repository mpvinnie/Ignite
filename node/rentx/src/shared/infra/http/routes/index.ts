import authenticateRoutes from '@modules/accounts/infra/http/routes/authenticate.routes'
import usersRoutes from '@modules/accounts/infra/http/routes/users.routes'
import categoriesRoutes from '@modules/cars/infra/http/routes/categories.routes'
import specificationsRoutes from '@modules/cars/infra/http/routes/specifications.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/categories', categoriesRoutes)
routes.use('/specifications', specificationsRoutes)
routes.use('/users', usersRoutes)
routes.use(authenticateRoutes)

export default routes
