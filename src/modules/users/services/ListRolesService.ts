import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ListRolesService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id }: IRequest): Promise<string[]> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const roles = user.roles.map(r => r.name);

    return roles;
  }
}

export default ListRolesService;