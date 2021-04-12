import AuthenticateUserController from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'
import { Router } from 'express'

const sessionsRoutes = Router()

const authenticateUserController = new AuthenticateUserController()

sessionsRoutes.post('/', authenticateUserController.handle)

export default sessionsRoutes
