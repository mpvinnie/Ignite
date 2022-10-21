import { Router } from 'express';
import { CreateUserController } from '../useCases/createUser/CreateUserController';

export const usersRoutes = Router()

usersRoutes.post('/', new CreateUserController().handle)