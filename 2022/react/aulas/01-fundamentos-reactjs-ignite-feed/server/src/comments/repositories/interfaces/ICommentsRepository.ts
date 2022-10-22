import { Comment } from "@prisma/client";
import { CreateCommentDTO } from "../../dtos/comment";

export interface ICommentsRepository {
  create(data: CreateCommentDTO): Promise<Comment>
  findByPostId(post_id: number): Promise<Comment[]>
  findByUserAndCommentId(user_id: number, comment_id: number): Promise<Comment | null>
  delete(comment: Comment): Promise<void>
}