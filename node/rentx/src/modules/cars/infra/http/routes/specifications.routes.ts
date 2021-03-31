import CreateSpecificationsController from '@modules/cars/useCases/createSpecification/CreateSpecificationsController'
import { Router } from 'express'

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationsController()

specificationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createSpecificationController.handle
)

export default specificationsRoutes
