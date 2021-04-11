import { Router } from 'express'

import CreateSpecificationController from '../../../useCases/createSpecifications/CreateSpecificationController'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post('/', createSpecificationController.handle)

export default specificationsRoutes
