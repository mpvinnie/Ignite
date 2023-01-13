import { container } from 'tsyringe'
import { CommentsApplauseRepository } from '../comments/repositories/implementations/CommentsApplauseRepository'
import { CommentsRepository } from '../comments/repositories/implementations/CommentsRepository'
import { ICommentsApplauseRepository } from '../comments/repositories/interfaces/ICommentsApplauseRepository'
import { ICommentsRepository } from '../comments/repositories/interfaces/ICommentsRepository'
import { PostsRepository } from '../posts/repositories/implementations/PostsRepository'
import { IPostsRepository } from '../posts/repositories/interfaces/IPostsRepository'
import { UsersRepository } from '../users/repositories/implementations/UsersRepository'
import { IUsersRepository } from '../users/repositories/interfaces/IUsersRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IPostsRepository>('PostsRepository', PostsRepository)
container.registerSingleton<ICommentsRepository>('CommentsRepository', CommentsRepository)
container.registerSingleton<ICommentsApplauseRepository>('CommentsApplauseRepository', CommentsApplauseRepository)