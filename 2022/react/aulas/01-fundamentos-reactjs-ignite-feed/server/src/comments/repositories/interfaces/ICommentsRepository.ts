import { Comment, CommentApplause } from "@prisma/client";
import { CreateCommentDTO } from "../../dtos/comment";

export interface CommentAddedProps {
  comment_applause: CommentApplause[];
  user: {
      avatar_url: string;
      name: string;
  };
  _count: {
      comment_applause: number;
  };
}

export interface ICommentsRepository {
  create(data: CreateCommentDTO): Promise<(Comment & CommentAddedProps)>
  findByPostId(user_id: number, post_id: number): Promise<(Comment & CommentAddedProps)[]>
  findByUserAndCommentId(user_id: number, comment_id: number): Promise<Comment | null>
  delete(comment: Comment): Promise<void>
}
