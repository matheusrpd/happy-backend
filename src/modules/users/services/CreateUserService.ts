import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IRolesRepository from '../repositories/IRolesRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
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
  roles: string[];
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ 
    name, 
    email, 
    password,
    cpf,
    phone_number,
    birthday,
    country,
    city,
    state,
    neighborhood,
    street,
    street_number,
    zipcode,
    roles
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const existsRoles = await this.rolesRepository.findByIds(roles);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      cpf,
      phone_number,
      birthday,
      country,
      city,
      state,
      neighborhood,
      street,
      street_number,
      zipcode,
      roles: existsRoles
    });

    return user;
  }
}

export default CreateUserService;