import { Router } from 'express';
import { CreateUserController } from '../useCases/createUser/CreateUserController';
import { ShowUserByIdController } from '../useCases/showUserById/ShowUserByIdController';

export const usersRoutes = Router()

usersRoutes.post('/', new CreateUserController().handle)
usersRoutes.get('/', new ShowUserByIdController().handle)