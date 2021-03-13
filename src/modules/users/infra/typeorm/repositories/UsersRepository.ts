import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id, {
      relations: ['roles', 'credit_cards']
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public async create({
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
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ 
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
    });

    await this.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;