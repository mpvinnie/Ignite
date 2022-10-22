import { Router } from "express";
import { CreateCommentController } from "../useCases/createComment/CreateCommentController";
import { ListCommentsByPostIdController } from "../useCases/listCommentsByPostId/ListCommentsByPostIdController";

export const commentsRoutes = Router()

commentsRoutes.post('/', new CreateCommentController().handle)
commentsRoutes.get('/', new ListCommentsByPostIdController().handle)