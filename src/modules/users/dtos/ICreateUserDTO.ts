import Role from '../infra/typeorm/entities/Role';

export default interface ICreateUsersDTO {
  name: string;
  email: string;
  password: string;
  roles: Role[];
}