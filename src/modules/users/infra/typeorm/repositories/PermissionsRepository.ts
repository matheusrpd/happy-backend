import { getRepository, Repository, Not } from 'typeorm';

import IPermissionsRepository from '@modules/users/repositories/IPermissionsRepository';
import ICreatePermissionDTO from '@modules/users/dtos/ICreatePermissionDTO';

import Permission from '../entities/Permission';

class PermissionsRepository implements IPermissionsRepository {
  private ormRepository: Repository<Permission>;

  constructor() {
    this.ormRepository = getRepository(Permission);
  }

  public async findByName(name: string): Promise<Permission | undefined> {
    return this.ormRepository.findOne({ name });
  }

  public async findByIds(permissions: string[]): Promise<Permission[]> {
    return this.ormRepository.findByIds(permissions);
  }

  public async create({
    name,
    description
  }: ICreatePermissionDTO): Promise<Permission> {
    const permission = this.ormRepository.create({ name, description });

    await this.save(permission);

    return permission;
  }

  public async save(permission: Permission): Promise<Permission> {
    return this.ormRepository.save(permission);
  }
}

export default PermissionsRepository;