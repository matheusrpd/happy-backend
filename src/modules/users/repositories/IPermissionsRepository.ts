import Permission from '../infra/typeorm/entities/Permission';
import ICreatePermissionDTO from '../dtos/ICreatePermissionDTO';

export default interface IPermissionsRepository {
  findByName(name: string): Promise<Permission | undefined>;
  findByIds(permissions: string[]): Promise<Permission[]>;
  create(data: ICreatePermissionDTO): Promise<Permission>;
  save(permission: Permission): Promise<Permission>;
}