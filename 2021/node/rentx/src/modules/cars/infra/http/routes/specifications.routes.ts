import CreateSpecificationController from '@modules/cars/useCases/createSpecifications/CreateSpecificationController'
import { Router } from 'express'

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.use(ensureAuthenticated, ensureAdmin)

specificationsRoutes.post('/', createSpecificationController.handle)

export default specificationsRoutes
