import CreateSpecificationController from '@modules/cars/useCases/createSpecifications/CreateSpecificationController'
import { Router } from 'express'

const specificationsRoutes = Router()

const createSpecificationController = new CreateSpecificationController()

specificationsRoutes.post('/', createSpecificationController.handle)

export default specificationsRoutes
