import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPermissionsRepository from '../repositories/IPermissionsRepository';
import IRolesRepository from '../repositories/IRolesRepository';

import Role from '../infra/typeorm/entities/Permission';

interface IRequest {
  name: string;
  description: string;
  permissions: string[];
}

@injectable()
class CreateRoleService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ name, description, permissions }: IRequest): Promise<Role> {
    const existRole = await this.rolesRepository.findByName(name);

    if (existRole) {
      throw new AppError('Role already exists.');
    }

    const existsPermissions = await this.permissionsRepository.findByIds(permissions);

    const role = await this.rolesRepository.create({
      name,
      description,
      permission: existsPermissions
    });

    return role;
  }
}

export default CreateRoleService;