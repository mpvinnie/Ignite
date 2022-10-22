import { Router } from "express";
import { ApplaudCommentController } from "../useCases/applaudComment/ApplaudCommentController";


export const commentsApplauseRoutes = Router()

commentsApplauseRoutes.post('/:comment_id', new ApplaudCommentController().handle)
