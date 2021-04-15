import passwordRoutes from '@modules/accounts/infra/http/routes/password.routes'
import sessionsRoutes from '@modules/accounts/infra/http/routes/sessions.routes'
import usersRoutes from '@modules/accounts/infra/http/routes/users.routes'
import carsRoutes from '@modules/cars/infra/http/routes/cars.routes'
import categoriesRoutes from '@modules/cars/infra/http/routes/categories.routes'
import specificationsRoutes from '@modules/cars/infra/http/routes/specifications.routes'
import rentalsRoutes from '@modules/rentals/infra/http/routes/rentals.routes'
import { Router } from 'express'

const routes = Router()

routes.use('/categories', categoriesRoutes)
routes.use('/specifications', specificationsRoutes)
routes.use('/users', usersRoutes)
routes.use('/sessions', sessionsRoutes)
routes.use('/cars', carsRoutes)
routes.use('/rentals', rentalsRoutes)
routes.use('/password', passwordRoutes)

export default routes
