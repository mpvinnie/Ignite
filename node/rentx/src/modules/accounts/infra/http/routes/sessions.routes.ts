import AuthenticateUserController from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController'
import RefreshTokenController from '@modules/accounts/useCases/refreshToken/RefreshTokenController'
import { Router } from 'express'

const sessionsRoutes = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

sessionsRoutes.post('/', authenticateUserController.handle)
sessionsRoutes.post('/refresh-token', refreshTokenController.handle)

export default sessionsRoutes
