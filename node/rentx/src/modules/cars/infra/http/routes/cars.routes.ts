import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController'
import { Router } from 'express'

import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const carsRoutes = Router()

const createCarController = new CreateCarController()

carsRoutes.use(ensureAuthenticated)

carsRoutes.post('/', createCarController.handle)

export default carsRoutes
