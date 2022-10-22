import { Comment } from "@prisma/client";
import { CreateCommentDTO } from "../../dtos/comment";

export interface ICommentsRepository {
  create(data: CreateCommentDTO): Promise<Comment>
}