import SpecificationsRepository from '../../repositories/implementations/SpecificationsRepository'
import CreateSpecificationsController from './CreateSpecificationsController'
import CreateSpecificationsUseCase from './CreateSpecificationsUseCase'

const specificationsRepository = SpecificationsRepository.getInstance()

const createSpecificationUseCase = new CreateSpecificationsUseCase(
  specificationsRepository
)

const createSpecificationController = new CreateSpecificationsController(
  createSpecificationUseCase
)

export default createSpecificationController
