import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { 
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
      roles } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
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

    return response.json(classToClass(user));
  }
}