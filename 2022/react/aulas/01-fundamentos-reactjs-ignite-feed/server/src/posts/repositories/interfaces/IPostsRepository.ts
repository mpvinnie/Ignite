import { Post } from "@prisma/client";
import { CreatePostDTO } from "../../dtos/post";

export interface IPostsRepository {
  create(data: CreatePostDTO): Promise<Post>
}