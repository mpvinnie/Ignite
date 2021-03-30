import CreateSpecificationsController from '@modules/cars/useCases/createSpecification/CreateSpecificationsController'
import { Router } from 'express'
import ensureAuthenticated from 'middlewares/ensureAuthenticated'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationsController()

specificationsRoutes.use(ensureAuthenticated)
specificationsRoutes.post('/', createSpecificationController.handle)

export default specificationsRoutes
