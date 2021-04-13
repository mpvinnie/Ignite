import sessionsRoutes from '@modules/accounts/infra/http/routes/sessions.routes'
import usersRoutes from '@modules/accounts/infra/http/routes/users.routes'
import carsRoutes from '@modules/cars/infra/http/routes/cars.routes'
import categoriesRoutes from '@modules/cars/infra/http/routes/categories.routes'
import specificationsRoutes from '@modules/cars/infra/http/routes/specifications.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/categories', categoriesRoutes)
routes.use('/specifications', specificationsRoutes)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/cars', carsRoutes)

export default routes
