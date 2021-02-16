import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  role: string[];
}

@injectable()
class VerifyPermissionService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ id, role }: IRequest): Promise<boolean> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const userRoles = user.roles.map((role) => role.name);

    const existsRoles = userRoles.some((r) => role.includes(r));

    return existsRoles;
  }
}

export default VerifyPermissionService;