import Role from '../infra/typeorm/entities/Role';

export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  cpf: string;
  birthday: Date;
  country: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  street_number: string;
  zipcode: string;
  roles: Role[];
}