import Role from '../infra/typeorm/entities/Role';
import ICreateRoleService from '../dtos/ICreateRoleDTO';

export default interface IRolesRepository {
  findByName(name: string): Promise<Role | undefined>;
  findByIds(roles: string[]): Promise<Role[]>;
  create(data: ICreateRoleService): Promise<Role>;
  save(role: Role): Promise<Role>;
}