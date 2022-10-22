import { Router } from "express";
import { CreateCommentController } from "../useCases/createComment/CreateCommentController";
import { DeleteCommentController } from "../useCases/deleteComment/DeleteCommentController";
import { ListCommentsByPostIdController } from "../useCases/listCommentsByPostId/ListCommentsByPostIdController";

export const commentsRoutes = Router()

commentsRoutes.post('/', new CreateCommentController().handle)
commentsRoutes.get('/', new ListCommentsByPostIdController().handle)
commentsRoutes.delete('/:comment_id', new DeleteCommentController().handle)