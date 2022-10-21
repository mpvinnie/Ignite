import { Router } from "express";
import { CreatePostController } from "../useCases/createPost/CreatePostController";
import { ListAllPostsController } from "../useCases/listAllPosts/ListAllPostsController";

export const postsRoutes = Router()

postsRoutes.post('/', new CreatePostController().handle)
postsRoutes.get('/', new ListAllPostsController().handle)