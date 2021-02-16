import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IPermissionsRepository from '../repositories/IPermissionsRepository';
import Permission from '../infra/typeorm/entities/Permission';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreatePermissionService {
  constructor(
    @inject('PermissionsRepository')
    private permissionsRepository: IPermissionsRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<Permission> {
    const existPermission = await this.permissionsRepository.findByName(name);

    if (existPermission) {
      throw new AppError('Permission already exists.');
    }

    const permission = await this.permissionsRepository.create({
      name,
      description
    });

    return permission;
  }
}

export default CreatePermissionService;