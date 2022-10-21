import { Router } from "express";
import { CreatePostController } from "../useCases/createPost/CreatePostController";

export const postsRoutes = Router()

postsRoutes.post('/', new CreatePostController().handle)