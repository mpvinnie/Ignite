import { Router } from 'express';
import { commentsRoutes } from './comments/routes/comments.routes';
import { commentsApplauseRoutes } from './comments/routes/commentsApplause.routes';
import { postsRoutes } from './posts/routes/posts.routes';
import { usersRoutes } from './users/routes/users.routes';

export const routes = Router()

routes.use('/users', usersRoutes)
routes.use('/posts', postsRoutes)
routes.use('/comments', commentsRoutes)
routes.use('/comments/applaud', commentsApplauseRoutes)