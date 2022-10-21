import { Router } from 'express';
import { postsRoutes } from './posts/routes/posts.routes';
import { usersRoutes } from './users/routes/users.routes';

export const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/posts', postsRoutes)