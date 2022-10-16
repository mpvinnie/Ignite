import uploadConfig from '@config/upload'
import CreateCarController from '@modules/cars/useCases/createCar/CreateCarController'
import CreateCarSpecificationController from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController'
import ListAvailableCarsController from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import UploadCarImageController from '@modules/cars/useCases/uploadCarImage/UploadCarImageController'
import { Router } from 'express'
import multer from 'multer'

import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin'
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated'

const carsRoutes = Router()

const uploadImages = multer(uploadConfig.upload('./tmp/cars'))

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarImageController = new UploadCarImageController()

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.use(ensureAuthenticated, ensureAdmin)

carsRoutes.post('/', createCarController.handle)

carsRoutes.post('/specifications/:id', createCarSpecificationController.handle)

carsRoutes.post(
  '/images/:id',
  uploadImages.array('images'),
  uploadCarImageController.handle
)

export default carsRoutes
