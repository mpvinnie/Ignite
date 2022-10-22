import { Router } from "express";
import { CreateCommentController } from "../useCases/createComment/CreateCommentController";

export const commentsRoutes = Router()

commentsRoutes.post('/', new CreateCommentController().handle)