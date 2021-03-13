import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  userId: string;
  name: string;
  email: string;
  oldPassword?: string;
  password?: string;
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
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    userId,
    name,
    email,
    password,
    oldPassword,
    phone_number,
    cpf,
    birthday,
    country,
    state,
    city,
    neighborhood,
    street,
    street_number,
    zipcode
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== userId) {
      throw new AppError('E-mail already in use.');
    }

    user.name = name;
    user.email = email;
    user.phone_number = phone_number;
    user.cpf = cpf;
    user.birthday = birthday;
    user.country = country;
    user.state = state;
    user.city = city;
    user.neighborhood = neighborhood;
    user.street = street;
    user.street_number = street_number;
    user.zipcode = zipcode;

    if (password && !oldPassword) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;