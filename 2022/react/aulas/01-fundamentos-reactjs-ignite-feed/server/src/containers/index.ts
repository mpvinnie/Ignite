import { container } from 'tsyringe'
import { PostsRepository } from '../posts/repositories/implementations/PostsRepository'
import { IPostsRepository } from '../posts/repositories/interfaces/IPostsRepository'
import { UsersRepository } from '../users/repositories/implementations/UsersRepository'
import { IUsersRepository } from '../users/repositories/interfaces/IUsersRepository'

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository)
container.registerSingleton<IPostsRepository>('PostsRepository', PostsRepository)