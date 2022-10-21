import { inject, injectable } from 'tsyringe';
import { CreateUserDTO } from '../../dtos/user';
import { IUsersRepository } from '../../repositories/interfaces/IUsersRepository';

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ avatar_url, banner_url, name, role }: CreateUserDTO) {
    const user = await this.usersRepository.create({
      avatar_url,
      banner_url,
      name,
      role
    })

    return {
      code: 201,
      user
    }
  }
}