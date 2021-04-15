import CreateRentalController from '@modules/rentals/useCases/createRental/CreateRentalController'
import DevolutionRentalController from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController'
import ListUserRentalsController from '@modules/rentals/useCases/listUserRentals/ListUserRentalsController'
import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listUserRentalsController = new ListUserRentalsController()

rentalsRoutes.use(ensureAuthenticated)

rentalsRoutes.post('/', createRentalController.handle)
rentalsRoutes.post('/devolution/:id', devolutionRentalController.handle)
rentalsRoutes.get('/user', listUserRentalsController.handle)

export default rentalsRoutes
