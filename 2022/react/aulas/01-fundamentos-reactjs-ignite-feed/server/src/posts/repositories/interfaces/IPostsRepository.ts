import { Post } from "@prisma/client";
import { CreatePostDTO } from "../../dtos/post";

export interface IPostsRepository {
  create(data: CreatePostDTO): Promise<Post>
  findAll(): Promise<Post[]>
  findById(id: number): Promise<Post | null>
}