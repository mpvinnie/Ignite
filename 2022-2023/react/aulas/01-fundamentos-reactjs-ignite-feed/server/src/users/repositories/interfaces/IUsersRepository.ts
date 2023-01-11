import { User } from '@prisma/client';
import { CreateUserDTO } from "../../dtos/user";

export interface IUsersRepository {
  create(data: CreateUserDTO): Promise<User>
  findById(id: number): Promise<User | null>
}