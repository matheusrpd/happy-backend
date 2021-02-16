import { getRepository, Repository, Not } from 'typeorm';

import IRolesRepository from '@modules/users/repositories/IRolesRepository';
import ICreateRoleDTO from '@modules/users/dtos/ICreateRoleDTO';

import Role from '../entities/Role';

class RolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async findByName(name: string): Promise<Role | undefined> {
    return this.ormRepository.findOne({ name });
  }

  public async findByIds(roles: string[]): Promise<Role[]> {
    return this.ormRepository.findByIds(roles);
  }

  public async create({
    name,
    description,
    permission
  }: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create({ name, description, permission });

    await this.save(role);

    return role;
  }

  public async save(role: Role): Promise<Role> {
    return this.ormRepository.save(role);
  }
}

export default RolesRepository;